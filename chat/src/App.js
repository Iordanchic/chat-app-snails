import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login'
import Header from "./components/Header/Header";

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
      <div className="App container">
          <Header />
        <Switch>
          <Route exact path="/" component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
