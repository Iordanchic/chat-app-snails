import React, { Component } from 'react';
import './Login.css';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';


class Login extends Component {
    constructor(props) {
        super(props);
    }
    handleLogin = () => {
        let data = JSON.stringify({ name: this.refs.login.value, password: this.refs.pass.value});
        fetch(`/authenticate`, { method: 'POST', headers: { "Content-Type": "application/json" }, body: data })
        .then(res => res.json())
        .then(res => {
            if(res.success === true){
                let str = JSON.stringify(res);
                localStorage.setItem("user_token", res.token)
                this.props.history.push('/profile')
            } else {
                alert(res.message)
            }
            console.log("res", res);

        })
        .catch(res => console.log('error'));

    }

    render() {
        return (
            <div className="container">
                <div className="row bg-color">
                    <div className="login-wrap">
                        <div className="login-form">
                            <h1> Welcome back</h1>
                            <label>Login:</label>
                            <input ref="login" type="text" />
                            <label>Password:</label>
                            <input ref="pass" type="password" />
                            <button onClick={this.handleLogin}> Enter </button>
                            <br />
                            <Link to={"signup"}>Sign Up </Link>
                            {/* <button onClick={this.getInfoFromServer}> Check Post request </button> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Login)
