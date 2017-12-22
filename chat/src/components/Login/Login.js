import React, { Component } from 'react';
import './Login.css';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';


class Login extends Component {
    constructor(props) {
        super(props);
    }
    handleLogin = () => {
        let loginValue = this.refs.login.value;
        let passValue = this.refs.pass.value;
       
        if(
            loginValue.length    < 15
            && loginValue.length >= 2
            && !loginValue.includes(' ')
            && passValue.length  < 15
            && passValue.length  >= 2
            && !passValue.includes(' ')
            
        ){
        let data = JSON.stringify({ name: this.refs.login.value, password: this.refs.pass.value});
        fetch(`/authenticate`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: data })
        .then(res => res.json())
        .then(res => {
            if(res.success === true){
                let str = JSON.stringify(res);
                localStorage.setItem('user_token', res.token)
                this.props.history.push('/profile')
            } else {
                if (res.reason === 'user') {
                    this.refs.login.style.borderBottom = "2px solid red";
                } else {
                    this.refs.pass.style.borderBottom = "2px solid red";
                }
            }
            console.log('res', res);

        })
        .catch(res => console.log('error'));

        } else {
            alert('Присутствуют недопустимые символы')
        }
    }

    colorChangeName = () => {
        this.refs.login.style.borderBottom = '2px solid rgb(155, 154, 154)';
    }
    colorChangePass = () => {
        this.refs.pass.style.borderBottom = '2px solid rgb(155, 154, 154)';
    }
    render() {
        return (
            <div className=' bg-color'>
                <div className="row">
                    <div className='col-12 login-wrap'>
                        <div className='login-form'>
                            <h1> Welcome back</h1>
                            <label>Login:</label>
                            <input onFocus={this.colorChangeName} ref='login' type='text' />
                            <label>Password:</label>
                            <input onFocus={this.colorChangePass} ref='pass' type='password' />
                            <button onClick={this.handleLogin}> Enter </button>
                            <br />
                            <Link to={'signup'}>Sign Up </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Login)
