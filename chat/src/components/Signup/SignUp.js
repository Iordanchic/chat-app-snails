import React from "react";
import {Link} from 'react-router-dom';



export default class SignUp extends React.Component {
    constructor(props){
        super(props)

    }
    handleSignUp = () =>{
        let data = JSON.stringify({ name: this.refs.login.value, password: this.refs.pass.value});
        fetch(`/setup`, { method: 'POST', headers: { "Content-Type": "application/json" }, body: data })
        .then(res => res.json())
        .then(res => {
            console.log("res", res);

        })
        .catch(res => console.log('error'));
    }
    render(){
        return(
            <div className="container">
            <div className="row bg-color">
                <div className="login-wrap">
                    <div className="login-form">
                        <h1> Регистрация </h1>
                        <label>Логин</label>
                        <input ref="login" type="text" />
                        <label>Пароль</label>
                        <input ref="pass" type="password" />
                        <button onClick={this.handleSignUp}> РЕГИСТРАЦИЯ </button>
                        <br />
                        <Link to={"/login"}>Есть аккаунт? </Link>
                        {/* <button onClick={this.getInfoFromServer}> Check Post request </button> */}
                    </div>
                </div>
            </div>
        </div>
        )

    }
}