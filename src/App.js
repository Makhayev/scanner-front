// import logo from './logo.svg';
// import './App.css';
import {Container, Row, Col, ListGroup, Button, InputGroup, FormControl, Alert, AlertProps} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useState, useEffect} from 'react'
import React from 'react'
import ReactDOM from 'react-dom'
function App() {
  // const [id, setid] = useState('0')
  var id = 0
  // const [Ids, setIds] = useState([])
  const [Money, setMoney] = useState(0)
  const [Name, setName] = useState('Whatever')
  const [objs, setobjs] = useState([])
 


  useEffect(() => {
    window.addEventListener('keyup', keypress)
    return () => {
      window.removeEventListener('keyup', keypress)
    }
  }, [])
  

  let keypress = (e) => {

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
        let ind = objs.indexOf(iter)
        
        for (let i = 0; i < Number(a); i++) {
          objs.push(iter)
         
        }
        ReactDOM.unmountComponentAtNode(e.target.parentElement.parentElement)
        let temp =  objs.map((item) => {
          return React.createElement('b', {id: item.id}, item.Name + ' ' + item.buy + '/' + item.sell, React.createElement('button', {className: 'btn btn-primary m-1', onClick: (e) => {clear2(e)}}, 'x'), React.createElement('button', {className: 'btn btn-secondary m-1', onClick: (e) => {multiply(e)}}, '*'))
        })
        ReactDOM.render(temp, document.getElementById('listik'))

        setMoney(Money => Money + iter.sell * Number(a))
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

      fetch('http://localhost/pay', options)
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
    function refresh() {
      let options = {
          method: 'GET'
      }

      fetch('http://localhost/refresh', options)
      .then((res) => {
          
    })

  }
  }

  // let newIte


  return (
    
      <Container>
        <Row>
          <Col> 
            <InputGroup className="mt-5 mb-5">
              {/* <InputGroup.Prepend>
                
              </InputGroup.Prepend> */}
              <FormControl
                id = "form"
                placeholder="Username"
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

            <Container className = "mt-5 mb-5 ">
              {Name}
            </Container>

            <Container className = "mt-5 mb-5">
              {Money}
            </Container>
            <Button className = "mt-3 mb-3 w-50" onClick = {pay}>
              Pay
            </Button>
            <br />
            <Button className = "mt-3 mb-3 w-50" onClick = {add}>
              Add Item

            </Button>
            <br />
            <Button className = "mt-3 mb-3 w-50" onClick = {report}>
              Report
            </Button>
            <br />
            <Button className = "mt-3 mb-3 w-50" onClick = {refresh}>
              Refresh
            </Button>
            <br />
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