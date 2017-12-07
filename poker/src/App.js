import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  getInfoFromServer = () => {

    let id = JSON.stringify({ number: 100  });
    fetch(`/aaa`, { method: 'POST', headers: { "Content-Type": "application/json" }, body: id })
    .then(res => res.json())
    .then(res => {
       
        console.log("res", res)
    })
    .catch(res => console.log('error'));
  }


  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to aaaaaaaaaaa</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.getInfoFromServer}>button</button>
      </div>
    );
  }
}

export default App;
