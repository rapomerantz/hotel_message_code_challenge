import React, { Component } from 'react';
import Clock from 'react-live-clock';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

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
      salutation: 'Good Morning!',
      template: templateJson,
      templateId: 1, 
      messageOutput: '',  
      donuts: false
    }
  }

  componentDidMount () {
    this.selectSalutation(); 
    this.populateTemplateState(); 
    this.populateMessage({id: this.state.templateId});     
  }

//call populateMessage() whenever this.state is changed
  componentDidUpdate (prevProps, prevState) {
    if (prevState.company !== this.state.company || prevState.guest !== this.state.guest || prevState.templateId !== this.state.templateId) {
      this.populateMessage()
    }
  }


  populateTemplateState = () => {
    this.setState({
      template: templateJson
    })
  }

  handleChangeTemplate = (element, name) => {
    let id = element.id - 1 //<-- array is zero indexed, ids start at 1
    this.setState({
      templateId: id
    })
  }

  handleChange = (element, name) => {
    this.setState({
      [name]: element
    })
  }

  //I imagine there's a more elegent way to do this but 
  //I went this route because it let me make a reasonably user-friend UI
  //(other options would be a series of text fields & dropdowns, drag and drop variables into a 
  //text field, or something like Material UI autofill)
  populateMessage = () => {
    this.selectSalutation(); 
    let newMessage = this.state.template[this.state.templateId].template
    newMessage = newMessage.replace('guestFirstName', this.state.guest.firstName)
    newMessage = newMessage.replace('guestLastName', this.state.guest.lastName)
    newMessage = newMessage.replace('guestRoomNumber', this.state.guest.reservation.roomNumber)
    newMessage = newMessage.replace('hotelName', this.state.company.company)
    newMessage = newMessage.replace('hotelCity', this.state.company.city)
    newMessage = newMessage.replace('hotelTimezone', this.state.company.timezone)
    newMessage = newMessage.replace('salutation', this.state.salutation)
    this.setState({
      messageOutput: newMessage
    })    
  }

  selectSalutation = () => {
    let timezone = this.state.company.timezone
//Switching given JSON values to something my .toLocalSting likes better
    if (timezone === 'US/Central') {
      timezone = 'America/Chicago'
    } else if (timezone === 'US/Pacific'){
      timezone = 'America/Los_Angeles'
    } else if (timezone === 'US/Eastern'){
      timezone = 'America/New_York'
    }
    let now = new Date().toLocaleString('en-US', {hour: '2-digit', hour12: false, timeZone: timezone}); 
    if (now >= 0 && now <= 11) {
      this.setState({
        salutation: 'Good Morning'
      })
    } else if (now > 11 && now <= 17) {
      this.setState({
        salutation: 'Good Afternoon'
      })
    } else if (now > 17 && now <= 24) {
      this.setState({
        salutation: 'Good Evening'
      })
    }
  }

  handleSubmit = (newMessage, newTitle) => {
    let newMessagePackage = {
      id: this.state.template.length + 1,
      title: newTitle, 
      template: newMessage
    }
    this.setState({
      template: [...this.state.template, newMessagePackage]
    })
  }

  handleDonuts = () => {
    this.setState({
      donuts: !this.state.donuts
    })
  }


  render() {
    let donutClass = 'App-header';
    let buttonText = ''
    let backgroundClass = ''
    if (this.state.donuts) {
      donutClass += ' donuts'
      buttonText = 'That\'s a little much...'
      backgroundClass = 'blue'
    }    

    return (
      <div className="App">
        <header className={donutClass}>
          <h1 className="App-title">Welcome to uspiK Messaging!</h1>
          <p>
            Your current time <Clock format={'HH:mm:ss a'} ticking={true} />
            <br/>
            <br/>
            Selected Company's current time: <Clock format={'HH:mm:ss a'} ticking={true} timezone={this.state.company.timezone} />
          </p> 

          <InputModal handleSubmit={this.handleSubmit}/>

        </header>
        <div className={backgroundClass}>
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

          <Card id="messageOutput"> 
            <h2>Message:</h2>
            <p>{this.state.messageOutput}</p>
          </Card>

          <Button onClick={this.handleDonuts} 
                  className="donutButton"
                  >
                  {buttonText}
          </Button>
        </div>
      </div>
    );
  }
}
export default App;
