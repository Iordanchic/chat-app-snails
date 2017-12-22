import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import './App.css';

import MainLayout    from './components/MainLayout';
import Login         from './components/Login/Login'
import Header        from "./components/Header/Header";
import Chat          from "./components/Chat/Chat";
import Welcome       from "./components/Welcome/Welcome";
import Profile       from "./components/Profile/Profile";
import SignUp        from "./components/Signup/SignUp";

import Atest from "./components/Atest/Atest"

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      user:{
        login:"",
        email: "",
        password:"",
        img:"",
      }
    }
  }

  getUserInfo = (objuser) => {
    this.setState({
      user:{
        login:objuser.login,
        email:objuser.email,
        password:objuser.password,
        img:objuser.img,
    }})
  }



  render() {
    return (
        <div className="container">
            <MainLayout>
                <Header/>
                <Switch>
                    <Route exact path='/' component={Welcome} />
                    <Route path='/login' component={Login} />
                    <Route path='/signup' component={SignUp} />
                    {localStorage.getItem("user_token")? <Route path='/chat/:id' component={Chat} />: <Route path='/chat' render={()=> <h1>404 ERROR</h1>}/>}
                    <Route path='/test' component={Atest} />} />
                    <Route path='/profile' render={() => <Profile getUserInfo={this.state.user}/>}/>
                    <Route path='/*' render={()=> <h1>404 ERROR</h1>}/>

                </Switch>
            </MainLayout>
        </div>
    );
  }
}

export default App;
