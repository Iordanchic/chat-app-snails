import React from "react";
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';



class SignUp extends React.Component {
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
        this.props.history.push('/login')
    }
    render(){
        return(
            <div className="container">
            <div className="row bg-color">
                <div className="login-wrap">
                    <div className="login-form">
                        <h1> Sign Up </h1>
                        <label>Login:</label>
                        <input ref="login" type="text" />
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