import React from "react";
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';



class SignUp extends React.Component {
    constructor(props){
        super(props)

    }
    handleSignUp = () => {
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
        let data = JSON.stringify({ name: this.refs.login.value, password: this.refs.pass.value, email: this.refs.email.value });
        fetch(`/setup`, { method: 'POST', headers: { "Content-Type": "application/json" }, body: data })
            .then(res => res.json())
            .then(res => {
                let valids = res.respons;
                if (!valids.nameRes) {
                    this.refs.login.style.borderBottom = "2px solid red";
                    if (!valids.emailValRes) {
                        this.refs.email.style.borderBottom = "2px solid red";
                    }
                } else if (!valids.emailValRes) {
                    this.refs.email.style.borderBottom = "2px solid red";
                } else {
                    this.props.history.push('/login');
                };

            })
            .catch(res => console.log('error'));
        } else {
            alert("Присутствуют недопустимые символы")
        }
    }
    
    colorChangeName = () => {
        this.refs.login.style.borderBottom = "2px solid rgb(155, 154, 154)";
    }
    colorChangeEmail = () => {
        this.refs.email.style.borderBottom = "2px solid rgb(155, 154, 154)";
    }

    render() {
        return(
            <div className="bg-color">
                <div className="row">
                    <div className="col-12 login-wrap">
                        <div className="login-form">
                            <h1> Sign Up </h1>
                            <label>Login:</label>
                            <input onFocus={this.colorChangeName} ref="login" type="text" />
                            <label>Email:</label>
                            <input onFocus={this.colorChangeEmail} ref="email" type="email" />
                            <label>Password:</label>
                            <input ref="pass" type="password" />
                            <button onClick={this.handleSignUp}> Sign Up </button>
                            <br />
                            <Link to={"/login"}>Already got an account? </Link>
                            {/* <button onClick={this.getInfoFromServer}> Check Post request </button> */}
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default withRouter(SignUp)