import React, { Component } from 'react';
import logo from '../../logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  handleCookieTest = () => {
    axios.get('/api/user/cookietest')
    .then(resp => console.log(resp.data.item));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" height="300px" width="300px" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <div className="colorTest bgBlack"></div>
        <div className="colorTest bgLightGray"></div>
        <div className="colorTest bgDarkGray"></div>
        <div className="colorTest bgBlue"></div>
        <div className="colorTest bgGreen"></div>
        <div className="colorTest bgRed"></div>
        <div className="colorTest bgOrange"></div>
        <div className="colorTest bgYellow"></div> */}
        {/* <div className="colorTest bg1"></div>
        <div className="colorTest bg2"></div>
        <div className="colorTest bg3"></div>
        <div className="colorTest bg4"></div>
        <div className="colorTest bg5"></div> */}
        <button onClick={this.handleCookieTest}>Cookie Test</button>
      </div>
    );
  }
}

export default App;
