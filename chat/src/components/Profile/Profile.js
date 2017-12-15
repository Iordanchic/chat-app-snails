import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './_Profile.css';
import { withRouter } from 'react-router-dom';



class Profile extends Component {
    constructor(props) {
        super(props);
        let data = JSON.stringify({token: localStorage.getItem("user_token")});
        fetch(`/test`, { method: 'POST', headers: { "Content-Type": "application/json"}, body: data})
            .then(res => res.json())
            .then(res => {
                console.log("res", res);
                if(res.success === false) {
                    this.setState({access: false})
                } else {
                    this.setState({access: true, name: res.name, img: res.img, id: res.id})
                }

            })
            .catch(err => console.log(err));
        this.state = {
            access: null,
            name: null,
            img: null,
            modalVisibility: false
        }
    }
    handleSave = () =>{
        let data = JSON.stringify({newname: this.refs.login.value, oldname: this.state.name, newpassword: this.refs.password.value, id: this.state.id, token: localStorage.getItem("user_token")});
        fetch(`/changeProfile`, { method: 'POST', headers: { "Content-Type": "application/json"}, body: data})
            .then(res => res.json())
            .then(res => {
                console.log("res", res);

            })
            .catch(err => console.log(err));
        this.setState({
            name: this.refs.login.value,
        });
        // localStorage.clear();
    };

    handleDelete = () =>{
        let data = JSON.stringify({id: this.state.id, token: localStorage.getItem("user_token")});
        fetch(`/deleteProfile`, { method: 'POST', headers: { "Content-Type": "application/json"}, body: data})
            .then(res => res.json())
            .then(res => {
                console.log("res", res);

            })
            .catch(err => console.log(err));
            localStorage.removeItem('user_token');
            this.props.history.push('/signup')
    };

    handleLogOut = () => {
        localStorage.removeItem('user_token');
        this.props.history.push('/login')
        // console.log(this.props.history)
    };
    handleEditImg = () => {
        this.setState({
            modalVisibility: true
        })
    };


    render() {
        console.log(this.state.img)
        console.log(''+this.state.img+'')
        return (
            <div className='profile-container'>
                {this.state.access === null? <h1> Loading </h1> : this.state.access === true?
                    <div className="profile-wrapper">
                        <div className="row">
                            <h1 className='profile-heading col-12'>Profile settings</h1>
                            <div className="profile-left-sidebar col-3">
                                <div className="row">
                                    <button className="profile-btn user-account col-12">User account</button>
                                    <button className="profile-btn exit-account col-12" onClick={this.handleLogOut}>Logout</button>
                                </div>
                            </div>

                            {/*<div className="row">*/}
                                <div className={this.state.modalVisibility ? "modal-window col-12" : "modal-none modal-window col-9"}>
                                    <h1>Choose your new account image:</h1>
                                    <div className="row">
                                        <div className="profile-img-edit-block col-9 d-flex justify-content-center flex-wrap">

                                            <div className="profile-img-edit-pic" style={{backgroundImage: 'url('+ require("../../img/icon1.jpg")+')'}}></div>
                                            <div className="profile-img-edit-pic" style={{backgroundImage: 'url('+ require("../../img/icon2.jpg")+')'}}></div>
                                            {/*<div className="profile-img-edit-pic" style={{backgroundImage: 'url('+ require("../../img/icon3.jpg")+')'}}></div>*/}
                                            <div className="profile-img-edit-pic" style={{backgroundImage: 'url('+ require("../../img/icon4.jpg")+')'}}></div>
                                            <div className="profile-img-edit-pic" style={{backgroundImage: 'url('+ require("../../img/icon5.jpg")+')'}}></div>
                                            <div className="profile-img-edit-pic" style={{backgroundImage: 'url('+ require("../../img/icon6.jpg")+')'}}></div>
                                            <div className="profile-img-edit-pic" style={{backgroundImage: 'url('+ require("../../img/icon7.jpg")+')'}}></div>
                                            <div className="profile-img-edit-pic" style={{backgroundImage: 'url('+ require("../../img/icon8.jpg")+')'}}></div>
                                            <div className="profile-img-edit-pic" style={{backgroundImage: 'url('+ require("../../img/icon9.jpg")+')'}}></div>
                                            <div className="profile-img-edit-pic" style={{backgroundImage: 'url('+ require("../../img/icon10.jpg")+')'}}></div>
                                            <div className="profile-img-edit-pic" style={{backgroundImage: 'url('+ require("../../img/icon11.jpg")+')'}}></div>
                                            <div className="profile-img-edit-pic" style={{backgroundImage: 'url('+ require("../../img/icon12.jpg")+')'}}></div>
                                            <div className="profile-img-edit-pic" style={{backgroundImage: 'url('+ require("../../img/icon13.jpg")+')'}}></div>
                                            <div className="profile-img-edit-pic" style={{backgroundImage: 'url('+ require("../../img/icon14.jpg")+')'}}></div>
                                            <div className="profile-img-edit-pic" style={{backgroundImage: 'url('+ require("../../img/icon15.jpg")+')'}}></div>
                                            <div className="profile-img-edit-pic" style={{backgroundImage: 'url('+ require("../../img/icon16.jpg")+')'}}></div>
                                        </div>
                                    </div>
                                    <div className="profile-img-buttons">
                                        <div className="row d-flex justify-content-center">
                                            <button className="profile-img-edit  col-3">Edit</button>
                                        </div>
                                    </div>
                                </div>
                            {/*</div>*/}


                            <div className="profile-main col-8">
                                <div className="row">
                                    <div className="profile-img-edit-block col-4">
                                        <div  className="profile-img-edit-pic" style={{backgroundImage: 'url('+ require("../../img/"+this.state.img+".jpg")+')'}}></div>
                                        <div className="profile-img-buttons">
                                            <button className="profile-img-edit" onClick={this.handleEditImg}>Edit</button>
                                        </div>
                                    </div>
                                    <div className="profile-info-wrapper col-7">
                                        <label htmlFor="login-edit">Login:</label>
                                        <input ref='login' className="profile-info login-edit" name='login-edit' defaultValue={this.state.name} required/>
                                        {/*<label htmlFor="email-edit">Email:</label>*/}
                                        {/*<input className="profile-info email-edit" name='email-edit'/>*/}
                                        <label htmlFor="password-edit">New Password:</label>
                                        <input type='password' ref='password' className="profile-info password-edit" name='password-edit' placeholder='Your new password' required/>
                                    </div>
                                    <div className="profile-btns-wrapper col-12">
                                        <button className="profile-del"  onClick={this.handleDelete}>Delete profile</button>
                                        <Link to={'/chat/main'} className="profile-cancel">Back to chat</Link>
                                        <button className="profile-save" onClick={this.handleSave}>Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>: <h1> Access DENIED. Log in please </h1>}
            </div>

        )
    }
}

export default withRouter(Profile)