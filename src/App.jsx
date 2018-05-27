import React, { Component } from 'react';
// import Moment from 'react-moment';
// import 'moment-timezone';
import Clock from 'react-live-clock';

import companiesJson from './providedData/Companies.json'
import guestsJson from './providedData/Guests.json'
import templateJson from './providedData/MessageTemplate.json'

import CompanySelect from './components/CompanySelect.jsx'
import GuestSelect from './components/GuestSelect.jsx'
import Checklist from './components/Checklist.jsx'


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
        template: {
          "id": 1,
          "title": "Welcome",
          "example": "Good morning Ethan, and welcome to Hotel California! Room 304 is now ready you. Enjoy your stay, and let us know if you need anything.",
          "format": "salutation guestFirstName, and welcome to hotelName! Room guestRoomNumber is now ready for you. Enjoy your stay, and let us know if you need anything"
      },
      messageOutput: '',  
    }
  }

  componentDidMount () {
    this.populateMessage(); 
  }

  handleChange = (element, name) => {
    console.log('in handleChange', element);
    this.setState({
      ...this.state,
      [name]: element
    })
    this.populateMessage(); 
  }


  populateMessage = () => {
    // let messageTemplate = this.state.template.format; 
    let messageTemplate = "salutation Mr. guestLastName, and welcome to beautiful hotelCity! At hotelName we take great pride in our facilities - please let us know if you need anything!"; 
    let newMessage = messageTemplate.replace('guestFirstName', this.state.guest.firstName)
    newMessage = newMessage.replace('guestLastName', this.state.guest.lastName)
    newMessage = newMessage.replace('guestRoomNumber', this.state.guest.reservation.roomNumber)
    newMessage = newMessage.replace('guestCheckIn', this.state.guest.reservation.startTimeStamp)
    newMessage = newMessage.replace('guestCheckOut', this.state.guest.reservation.endTimeStamp)
    newMessage = newMessage.replace('hotelName', this.state.company.company)
    newMessage = newMessage.replace('hotelCity', this.state.company.city)
    newMessage = newMessage.replace('hotelTimezone', this.state.company.timezone)
    newMessage = newMessage.replace('salutation', 'HELOOOOOOO')
    console.log(newMessage);
    this.setState({
      messageOutput: newMessage
    })
  }

  render() {




    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Kipsu Messaging</h1>
          <h3>Connecting Hotels to Their Guests, Everyday</h3>
          <p>
            Your current time <Clock format={'HH:mm:ss a'} ticking={true} />
          </p> 
          <p>
            Selected Company's current time: <Clock format={'HH:mm:ss a'} ticking={true} timezone={this.state.company.timezone} />
          </p> 
        </header>

        {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}

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

        <Checklist jsonInput={templateJson}
                    handleChange={this.handleChange}
                    name="template"
                    tag1="title"
                    tag2="example"
                    space=" - "
                    />




        <div>
          <h2>Message:</h2>

            <p>{this.state.messageOutput}</p>


        </div>

      </div>
    );
  }
}

export default App;
