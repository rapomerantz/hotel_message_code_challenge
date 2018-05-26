import React, { Component } from 'react';

import CompaniesList from './components/CompaniesList.jsx'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Kipsu Messaging</h1>
          <h2>We hope you're having a great day!</h2>
        </header>


        <h3>Companies</h3>
        <CompaniesList />
        <h3>Guests</h3>

      </div>
    );
  }
}

export default App;
