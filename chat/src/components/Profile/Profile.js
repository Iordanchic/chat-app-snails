import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './_Profile.css';
import { withRouter } from 'react-router-dom';

class Profile extends Component {
    constructor(props) {
        super(props);
        let data = JSON.stringify({token: localStorage.getItem("user_token")});
        fetch(`/users`, { method: 'POST', headers: { "Content-Type": "application/json"}, body: data})
            .then(res => res.json())
            .then(res => {
                console.log("res", res);
                if(res.success === false) {
                    this.setState({access: false})
                } else {
                    this.setState({access: true, name: res.name})
                }

            })
            .catch(err => console.log(err));
        this.state = {
            access: null,
            name: null
        }
    }
    handleSave = () =>{
        let data = JSON.stringify({newname: this.refs.login.value, oldname: this.state.name, newpassword: this.refs.password.value});
        fetch(`/changeProfile`, { method: 'POST', headers: { "Content-Type": "application/json"}, body: data})
            .then(res => res.json())
            .then(res => {
                console.log("res", res);

            })
            .catch(err => console.log(err));
        this.setState({
            name: this.refs.login.value,
        });
        localStorage.clear();
    };

    handleDelete = () =>{


    };

    handleLogOut = () => {
        localStorage.removeItem('user_token');
        this.props.history.push('/login')
        // console.log(this.props.history)
    }


    render() {
        console.log(this.props.getUserInfo)
        return (
            <div>
                {this.state.access === null? <h1> Loading </h1> : this.state.access === true?
                <div className='container'>
                    <div className="profile-wrapper row">
                        <h1 className='profile-heading col-12'>Profile settings</h1>
                        <div className="profile-left-sidebar col-3">
                            <div className="row">
                                <button className="profile-btn user-account col-12">User account</button>
                                <button className="profile-btn exit-account col-12" onClick={this.handleLogOut}>Logout</button>
                            </div>

                        </div>
                        <div className="profile-main col-8">
                            <div className="row">
                                <div className="profile-img-edit-block col-4">
                                    <div className="profile-img-edit-pic"></div>
                                    {/*<div className="profile-img-buttons">*/}
                                        {/*<button className="profile-img-del">Del</button>*/}
                                        {/*<button className="profile-img-edit">Edit</button>*/}
                                    {/*</div>*/}
                                </div>
                                <div className="profile-info-wrapper col-7">
                                    <label htmlFor="login-edit">Login:</label>
                                    <input ref='login' className="profile-info login-edit" name='login-edit' defaultValue={this.state.name} required/>
                                    {/*<label htmlFor="email-edit">Email:</label>*/}
                                    {/*<input className="profile-info email-edit" name='email-edit'/>*/}
                                    <label htmlFor="password-edit">New Password:</label>
                                    <input type='password' ref='password' className="profile-info password-edit" name='password-edit' defaultValue='12345' required/>
                                </div>
                                <div className="profile-btns-wrapper col-12">
                                    <button className="profile-del"  onClick={this.handleDelete}>Delete profile</button>
                                    <Link to={'/chat/main'} className="profile-cancel">Cancel</Link>
                                    <button className="profile-save" onClick={this.handleSave}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : <h1> Access DENIED. Log in please </h1>}

            </div>

        )
    }
}

export default withRouter(Profile)