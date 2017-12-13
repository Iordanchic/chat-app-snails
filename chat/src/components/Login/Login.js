import React, { Component } from 'react';
import './Login.css';
import {Link} from 'react-router-dom';


export default class Login extends Component {
    constructor(props) {
        super(props);
    }
    handleLogin = () => {
        // let data = JSON.stringify({ info: "Hello from client", name: "Petya"});
        // fetch(`/aaa`, { method: 'POST', headers: { "Content-Type": "application/json" }, body: data })
        // .then(res => res.json())
        // .then(res => {

        //     console.log("res", res)
        // })
        // .catch(res => console.log('error'));

        let data = JSON.stringify({ name: this.refs.login.value, password: this.refs.pass.value});
        fetch(`/authenticate`, { method: 'POST', headers: { "Content-Type": "application/json" }, body: data })
        .then(res => res.json())
        .then(res => {
            console.log("res", res);
            let str = JSON.stringify(res);
            localStorage.setItem("user_token", res.token)

        })
        .catch(res => console.log('error'));

    }

    render() {
        return (
            <div className="container">
                <div className="row bg-color">
                    <div className="login-wrap">
                        <div className="login-form">
                            <h1> С возвращением </h1>
                            <label>Логин</label>
                            <input ref="login" type="text" />
                            <label>Пароль</label>
                            <input ref="pass" type="password" />
                            <button onClick={this.handleLogin}> ВОЙТИ </button>
                            <br />
                            <Link to={"signup"}>Зарегистрироваться </Link>
                            {/* <button onClick={this.getInfoFromServer}> Check Post request </button> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
    
