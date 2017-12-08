import React, { Component } from 'react';
import './Login.css';
import {Link} from 'react-router-dom';


export default class Login extends Component {
    constructor(props) {
        super(props);
    }
    getInfoFromServer = () => {
        
            let data = JSON.stringify({ info: "Hello from client", name: "Petya"});
            fetch(`/aaa`, { method: 'POST', headers: { "Content-Type": "application/json" }, body: data })
            .then(res => res.json())
            .then(res => {
               
                console.log("res", res)
            })
            .catch(res => console.log('error'));
          }
   
    render() {
        return (
            <div className="container">
                <div className="row bg-color">
                    <div className="login-wrap">
                        <div className="login-form">
                            <h1> с возвращением </h1>
                            <label>Логин</label>
                            <input type="text" />
                            <label>Пароль</label>
                            <input type="password" />
                            <button> ВОЙТИ </button>
                            <br />
                            <Link to={"google.com"}>Зарегистрироваться </Link>
                            {/* <button onClick={this.getInfoFromServer}> Check Post request </button> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
    
