import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import Login from './components/Login/Login';
import MainLayout from './components/MainLayout';

class App extends Component {

  getInfoFromServer = () => {

    let id = JSON.stringify({ number: 100 });
    fetch(`/aaa`, { method: 'POST', headers: { "Content-Type": "application/json" }, body: id })
    .then(res => res.json())
    .then(res => {
       
        console.log("res", res)
    })
    .catch(res => console.log('error'));
  }


  render() {
    
    return (
      <MainLayout>
        <Switch>
          <Route path='/login' component={Login} />
        </Switch>
      </MainLayout>
    );
  }
}

export default App;
