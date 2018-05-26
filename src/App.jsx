import React, { Component } from 'react';

import companiesJson from './providedData/Companies.json'
import guestsJson from './providedData/Guests.json'

import CompanySelect from './components/CompanySelect.jsx'
import GuestSelect from './components/GuestSelect.jsx'
import Checklist from './components/Checklist.jsx'


import './App.css';

class App extends Component {
  constructor(props) {
    super(props) 

    this.state = {
      company: '',
      guest: '', 
      template: '', 

    }
  }

  handleChange = (element, name) => {
    console.log('in handleChange', element);
    this.setState({
      ...this.state,
      [name]: element
    })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Kipsu Messaging</h1>
          <h3>Connecting Hotels to Their Guests, Everyday</h3>
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
                    
        <Checklist jsonInput={guestsJson}
                    handleChange={this.handleChange}
                    name="guest"
                    tag1="firstName"
                    tag2="lastName"
                    space=" "
                    />




        <div>
          <h2>Message:</h2>
          <pre>{JSON.stringify(this.state, null, 2)}</pre>

        </div>

      </div>
    );
  }
}

export default App;
