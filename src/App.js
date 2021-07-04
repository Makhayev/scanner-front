// import logo from './logo.svg';
// import './App.css';
import {Container, Row, Col, ListGroup, Button, InputGroup, FormControl, Modal, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect, useRef} from 'react'
import React from 'react'
import ReactDOM from 'react-dom'
function App() {
  // const [id, setid] = useState('0')
  var id = 0
  // const [Ids, setIds] = useState([])
  const [Money, setMoney] = useState(0)
  const [Name, setName] = useState('Whatever')
  const [objs, setobjs] = useState([])
  const [show2, setShow2] = useState(false)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false)
  const handleShow = () => setShow(true);
  const handleShow2 = () => setShow2(true)
  const inputIdRef = useRef()
  const inputNameRef = useRef()
  const inputCountRef = useRef()
  const inputBuyPriceRef = useRef()
  const inputSellPriceRef = useRef()

  const inputIdRef2 = useRef()
  const inputNameRef2 = useRef()
  const inputCountRef2 = useRef()
  const inputBuyPriceRef2 = useRef()
  const inputSellPriceRef2 = useRef()

  useEffect(() => {
    window.addEventListener('keyup', keypress)
    return () => {
      window.removeEventListener('keyup', keypress)
    }
  }, [])
  

  let keypress = (e) => {
    
    for (let tempVar = 0; tempVar < 10; tempVar++) {
      if (e.key == String(tempVar)) {
        
        console.log('number press')
        let tempidd = document.getElementById('form').value
        tempidd = String(tempidd) + String(tempVar)
        document.getElementById('form').value = tempidd
        break
      }
    }

    if (e.key == 'Enter') {
      console.log('keyup')
      id = document.getElementById('form').value
      let tempId = id
      console.log(tempId)
      // setid(0)

      let data = {
        id: tempId
      }

      var options = {
        method: 'POST',
        body: JSON.stringify(data),
    
        headers: {
            'Content-Type': 'application/json'
        }
      };
          
      fetch('http://localhost/see', options)
          .then((response) => {
          // console.log(response)
          // let a = JSON.parse(response)
          return response.json();
      })
      
      .then((jsonObject) => {
        console.log(jsonObject)
        
        
        objs.push(jsonObject)
        
        
        console.log(objs)
        let temp =  objs.map((item) => {
          return React.createElement('b', {id: item.id}, item.Name + ' ' + item.buy + '/' + item.sell, React.createElement('button', {className: 'btn btn-primary m-1', onClick: (e) => {clear2(e)}}, 'x'), React.createElement('button', {className: 'btn btn-secondary m-1', onClick: (e) => {multiply(e)}}, '*'))
        })
        document.getElementById('form').value = ''
        setName(jsonObject.Name)
        setMoney((Money) => Money + Number(jsonObject.sell))
        
        ReactDOM.render(temp, document.getElementById('listik'))
      })
    } 
  }
  

  let pay = () => {
    console.log('pay invoked')

    console.log(objs)
    console.log(Money)
    var sendArr = []

      for (var j of objs) {
        sendArr.push(Number(j.id))
      }
      console.log(sendArr)
      var options = {
        method: 'POST',
        body: JSON.stringify(sendArr),
            
        headers: {
          'Content-Type': 'application/json'
          }
      }

      fetch('http://localhost/pay', options)
      .then((response) => {
                
      })

      setMoney(0)
      objs.splice(0, objs.length)
      setName(' ')
      // document.getElementById('listik').innerHTML = ''
    
      ReactDOM.unmountComponentAtNode(document.getElementById('listik'))



  }

  let multiply = (e) => {


    console.log('multiply invoked')
    let a = prompt('Enter Quantity: ')

    for (const iter of objs) { 
      if (iter.id == e.target.parentElement.id) {
        
        
        for (let i = 0; i < Number(a) - 1; i++) {
          objs.push(iter)
         
        }
        ReactDOM.unmountComponentAtNode(e.target.parentElement.parentElement)
        let temp =  objs.map((item) => {
          return React.createElement('b', {id: item.id}, item.Name + ' ' + item.buy + '/' + item.sell, React.createElement('button', {className: 'btn btn-primary m-1', onClick: (e) => {clear2(e)}}, 'x'), React.createElement('button', {className: 'btn btn-secondary m-1', onClick: (e) => {multiply(e)}}, '*'))
        })
        ReactDOM.render(temp, document.getElementById('listik'))

        setMoney(Money => Money + iter.sell * Number(a) - iter.sell)
        console.log(objs)
        break
      }
    }

  }

  let clear2 = (e) => {

    console.log('clear2 invoked')
    console.log(e.target.parentElement.parentElement)
    console.log(e.target.parentElement.id)

    for (const iter of objs) {
      if (iter.id == e.target.parentElement.id) {
        let ind = objs.indexOf(iter)
        objs.splice(ind, 1)
        setMoney(Money => Money - iter.sell)
        console.log(objs)
        break
      }
    }


    // objs.forEach((item) => {
    //   if (item.id == e.target.parentElement.id){
    //     let ind = objs.indexOf(item)
    //     objs.splice(ind, 1)
    //     console.log(objs)
        
    //   }
    // })
    ReactDOM.unmountComponentAtNode(e.target.parentElement.parentElement)
    let temp =  objs.map((item) => {
      return React.createElement('b', {id: item.id}, item.Name + ' ' + item.buy + '/' + item.sell, React.createElement('button', {className: 'btn btn-primary m-1', onClick: (e) => {clear2(e)}}, 'x'), React.createElement('button', {className: 'btn btn-secondary m-1', onClick: (e) => {multiply(e)}}, '*'))
    })
    ReactDOM.render(temp, document.getElementById('listik'))
  }

  let add = () => {
    console.log('add invoked')
    // console.log('pay invoked')

    console.log(objs)
    console.log(Money)
    var sendArr = []

      for (var j of objs) {
        sendArr.push(j.id)
      }
      console.log(sendArr)
      var options = {
        method: 'POST',
        body: JSON.stringify(sendArr),
            
        headers: {
          'Content-Type': 'application/json'
          }
      }

      fetch('http://localhost/add', options)
      .then((response) => {
                
      })

      setMoney(0)
      setName(' ')
      objs.splice(0, objs.length)

      // document.getElementById('listik').innerHTML = ''
    
      ReactDOM.unmountComponentAtNode(document.getElementById('listik'))
      
  }

  let report = () => {
    console.log('report invoked')
    let options = {
      method: 'GET'
    }
    fetch('http://localhost/report', options)
    .then((response) => {
        // console.log(response)
        // alert()
        return response.json()
    })
    .then((rep) => {
        console.log(rep)
        alert("Продано за сегодня: " + rep.todaysell + "\nПрофит за сегодня: " + (rep.todaysell - rep.todaybuy) + "\nПродано за все время: " + (rep.alltimesell) + "\nПрофит за все время: "  + (rep.alltimesell - rep.alltimebuy))
    })
  }

  let refresh = () => {
    console.log('refresh invoked')
    // function refresh() {
      let options = {
          method: 'GET'
      }

      fetch('http://localhost/refresh', options)
      .then((res) => {
          console.log('refreshed ' + res)
    })
    .catch((err) => {
      console.log(err)
    })

  // }
  }

  let addNewItem = () => {
    console.log('add new item invoked')
    setShow(false)
    
    let toSend = {
      id: inputIdRef.current.value,
      Name: inputNameRef.current.value,
      count: inputCountRef.current.value,
      buy: inputBuyPriceRef.current.value,
      sell: inputSellPriceRef.current.value
    }

    let options = {
      method: 'POST',
      body: JSON.stringify(toSend),
      headers: {
        'content-type': 'application/json'
      }
    }


    fetch('http://localhost/addNewItem', options)
    .then(res => {
      console.log('added new item ' + res)
    })
    .catch(err => {
      console.log(err)
    })

  }

  let xclear = () => {
    console.log('X')
    document.getElementById('form').value = ''

  }

  let searchByName = () => {
    let searching = document.getElementById('nameSearch').value
    document.getElementById('nameSearch').value = ''
    let toSend = {
      search: searching,
    }
    let options = {
      method: 'POST',
      body: JSON.stringify(toSend),
      headers: {
        'content-type': 'application/json'
      }
    }
    console.log(toSend)
    fetch('http://localhost/searchByName', options)
    .then( res => { return res.json()})
    .then(res => {
      console.log(res)
      for (let i of res) {
        objs.push(i)
        setMoney( (money) => money + Number(i.sell))
      }
      console.log(objs)
      let temp =  objs.map((item) => {
        return React.createElement('b', {id: item.id}, item.Name + ' ' + item.buy + '/' + item.sell, React.createElement('button', {className: 'btn btn-primary m-1', onClick: (e) => {clear2(e)}}, 'x'), React.createElement('button', {className: 'btn btn-secondary m-1', onClick: (e) => {multiply(e)}}, '*'))
      })
      ReactDOM.render(temp, document.getElementById('listik'))
    })


  }

  let fetchItem = () => {

    console.log('fetchItem invoked')

    let tempId = inputIdRef2.current.value
    console.log(tempId)
    

    let data = {
      id: tempId,
    }

    var options = {
      method: 'POST',
      body: JSON.stringify(data),
  
      headers: {
          'Content-Type': 'application/json'
      }
    }
    
    fetch('http://localhost/see', options)
    .then((response) => {
    // console.log(response)
    // let a = JSON.parse(response)
    return response.json();
    })

    .then((jsonObject) => {
      console.log(jsonObject)
      inputNameRef2.current.value = jsonObject.Name
      inputBuyPriceRef2.current.value = jsonObject.buy
      inputCountRef2.current.value = jsonObject.count
      inputSellPriceRef2.current.value = jsonObject.sell


    })


  }

  let changeItem = () => {

    
    let toSend = {
      id: inputIdRef2.current.value,
      Name: inputNameRef2.current.value,
      count: inputCountRef2.current.value,
      buy: inputBuyPriceRef2.current.value,
      sell: inputSellPriceRef2.current.value
    }

    let options = {
      method: 'POST',
      body: JSON.stringify(toSend),
      headers: {
        'content-type': 'application/json'
      }
    }

    fetch('http://localhost/changeItem', options)
    

  }

  return (

    
    
      <Container>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Adding new item...</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Control ref = {inputIdRef} type="text" placeholder="Enter id" />
        <br />
        <Form.Control ref = {inputNameRef} type="text" placeholder="Enter Name" />
        <br />
        <Form.Control ref = {inputCountRef} type="text" placeholder="Enter count" />
        <br />
        <Form.Control ref = {inputBuyPriceRef} type="text" placeholder="Enter buying price" />
        <br />
        <Form.Control ref = {inputSellPriceRef} type="text" placeholder="Enter selling price" />
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={addNewItem}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title> Changing an Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Control ref = {inputIdRef2} type="text" placeholder="id" />
        <br />
        <Form.Control ref = {inputNameRef2} type="text" placeholder="Name" />
        <br />
        <Form.Control ref = {inputCountRef2} type="text" placeholder="count" />
        <br />
        <Form.Control ref = {inputBuyPriceRef2} type="text" placeholder="buying price" />
        <br />
        <Form.Control ref = {inputSellPriceRef2} type="text" placeholder="selling price" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant = "primary" onClick = {fetchItem}>
            Search for an item
          </Button>
          
          <Button variant="primary" onClick={changeItem}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
        <Row>
          <Col> 
            <InputGroup className="mt-5 mb-5">
              {/* <InputGroup.Prepend>
                
              </InputGroup.Prepend> */}
              <Button onClick = {xclear}>X</Button>
              <FormControl
                id = "form"
                placeholder="Item ID"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange = {
                  event => { 
                    
                    // setid(event.target.value)
                   
                    // console.log(id)
                  }
                }
              />
              
            </InputGroup>

            <Container className = "mt-5 mb-5 h1">
              {Name}
            </Container>

            <Container className = "mt-5 mb-5 h1">
              {Money}
            </Container>
            <Row>
              <Col xs = {6}>
              <Button className = "mt-3 mb-3 w-100" onClick = {pay}>
                Pay
              </Button>
              <br />
              <Button className = "mt-3 mb-3 w-100" onClick = {add}>
                Add Item
              
              </Button>
              <br />
              
              <InputGroup className = "mt-3 mb-3 w-100">
                <FormControl id = 'nameSearch' placeholder = 'search by name' >

                </FormControl>
              </InputGroup>
              
              <Button className = "mt-3 mb-3 w-100" onClick = {searchByName}>
                  Search by name
                </Button>
              <br />
              
              </Col>
              <Col xs = {6}>
              <Button className = "mt-3 mb-3 w-100" onClick = {report}>
                Report
              </Button>
              <br />
              <Button className = "mt-3 mb-3 w-100" onClick = {refresh}>
                Refresh
              </Button>
              <br />
              <Button className = "mt-3 mb-3 w-100" onClick = {handleShow}>
                  Add new Item
                </Button>
                <br />
              <Button className = "mt-3 mb-3 w-100" onClick = {handleShow2}>
                Change an Item
              </Button>
              </Col >
             
              
             
            </Row>
          </Col>
          <Col>
          
            <ListGroup id = "listik">
              
            </ListGroup>
          
          
          
          </Col>
        </Row>
      </Container>
    
  );
}

export default App;
