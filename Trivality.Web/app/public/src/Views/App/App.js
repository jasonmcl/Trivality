import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" height="300px" width="300px" />
          <h1 className="App-title">Welcome</h1>
        </header>
      </div>
    );
  }
}

export default App;
