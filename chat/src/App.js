import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom';
import './App.css';
import MainLayout from './components/MainLayout';
import Login from './components/Login/Login'
import Header from "./components/Header/Header";
import Chat from "./components/Chat/Chat";
import Footer from "./components/Footer/Footer";
import Profile from "./components/Profile/Profile";
import SelectRooms from "./components/SelectRooms/SelectRooms";


class App extends Component {

  getInfoFromServer = () => {

    // let id = JSON.stringify({ number: 100 });
    // fetch(`/aaa`, { method: 'POST', headers: { "Content-Type": "application/json" }, body: id })
    // .then(res => res.json())
    // .then(res => {
       
    //     console.log("res", res)
    // })
    // .catch(res => console.log('error'));
  }


  render() {
    return (

        <div className="container">
            <MainLayout>
                <Header />
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/chat' component={Chat}/>
                    <Route path='/profile' component={Profile}/>
                </Switch>
                <Footer />
            </MainLayout>
        </div>
    );
  }
}

export default App;
