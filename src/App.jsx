import React, { Component } from 'react';
import Moment from 'react-moment';
import 'moment-timezone';
import Clock from 'react-live-clock';
import Card from '@material-ui/core/Card';


import companiesJson from './providedData/Companies.json'
import guestsJson from './providedData/Guests.json'
import templateJson from './providedData/MessageTemplate.json'


import Checklist from './components/Checklist.jsx'
import InputModal from './components/InputModal.jsx'


import './App.css';

class App extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      company:   {
        "id": null,
        "company": "____",
        "city": "____",
        "timezone": "US/Central"
      },
      guest:  {
        "id": null,
        "firstName": "___",
        "lastName": "____",
        "reservation": {
          "roomNumber": "____",
          "startTimestamp": "______",
          "endTimestamp": "____"
        }
      }, 
      template: templateJson,
      templateId: 1, 
      messageOutput: '',  
    }
  }

  componentDidMount () {
    this.selectSalutation(); 
    this.populateTemplateState(); 
    console.log(this.state.template);
    this.populateMessage({id: this.state.templateId});     
  }

  populateTemplateState = () => {
    this.setState({
      template: templateJson
    })
  }

  handleChangeTemplate = (element, name) => {
    let id = element.id - 1 //<-- array is zero indexed, ids start at 1
    console.log('handleChangeTemplate', id, name);
    this.setState({
      templateId: id
    })
    this.populateMessage()
  }


  handleChange = (element, name) => {
    console.log(element.id, name);
    this.setState({
      ...this.state,
      [name]: element
    })
    this.populateMessage(element, name); 
  }

  //I can imagine there's a more elegent way to do this but 
  //I went this route because it more easily let me make a user-friend UI
  //(as opposed to having dropdowns to select the variables)
  populateMessage = (element, name) => {
    let newMessage = this.state.template[this.state.templateId].template
    newMessage = newMessage.replace('guestFirstName', this.state.guest.firstName)
    newMessage = newMessage.replace('guestLastName', this.state.guest.lastName)
    newMessage = newMessage.replace('guestRoomNumber', this.state.guest.reservation.roomNumber)
    newMessage = newMessage.replace('guestCheckIn', this.state.guest.reservation.startTimeStamp)
    newMessage = newMessage.replace('guestCheckOut', this.state.guest.reservation.endTimeStamp)
    newMessage = newMessage.replace('hotelName', this.state.company.company)
    newMessage = newMessage.replace('hotelCity', this.state.company.city)
    newMessage = newMessage.replace('hotelTimezone', this.state.company.timezone)
    newMessage = newMessage.replace('salutation', 'Good morning')
    this.setState({
      messageOutput: newMessage
    })
  }

  selectSalutation = () => {
    let currentTime = new Date().getTime(); 
    console.log(currentTime);
  }




  handleSubmit = (newMessage, newTitle) => {
    console.log('in handleNewMessage App, new Message:', newMessage);    
    let newMessagePackage = {
      id: this.state.template.length + 1,
      title: newTitle, 
      // example: newMessage, 
      template: newMessage
    }
    this.setState({
      template: [...this.state.template, newMessagePackage]
    })
  }


  render() {



    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Kipsu Messaging</h1>
          <p>
            Your current time <Clock format={'HH:mm:ss a'} ticking={true} />
            <br/>
            <br/>
            Selected Company's current time: <Clock format={'HH:mm:ss a'} ticking={true} timezone={this.state.company.timezone} />
          </p> 
          <p>
          </p> 
        </header>

        <pre>{JSON.stringify(this.state, null, 2)}</pre>

          <Checklist jsonInput={companiesJson}
                      handleChange={this.handleChange}
                      name="company"
                      tag1="company"
                      tag2="city"
                      space=" - "
                      />


        <Checklist jsonInput={guestsJson}
                    handleChange={this.handleChange}
                    name="guest"
                    tag1="firstName"
                    tag2="lastName"
                    space=" "
                    />

        <Checklist jsonInput={this.state.template}
                    handleChange={this.handleChangeTemplate} //<-- using a different handle change function for the message template 
                    name="template"
                    tag1="id"
                    tag2="title"
                    space=" - "
                    />

          <InputModal handleSubmit={this.handleSubmit}/>

        <Card id="messageOutput"> 
          <h2>Message:</h2>
          <p>{this.state.messageOutput}</p>

        </Card>
        {/* <img src="/assets/donuts.jpeg" alt=""/> */}
      </div>

    );
  }
}

export default App;
