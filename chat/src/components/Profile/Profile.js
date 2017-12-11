import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './_Profile.css';

export default class Profile extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        console.log(this.props.getUserInfo)
        return (
            <div className='container'>
                <div className="profile-wrapper row">
                    <h1 className='profile-heading col-12'>Profile settings</h1>
                    <div className="profile-left-sidebar col-3">
                        <div className="row">
                            <button className="profile-btn user-account col-12">User account</button>
                            <button className="profile-btn exit-account col-12">Exit</button>
                        </div>

                    </div>
                    <div className="profile-main col-8">
                        <div className="row">
                            <div className="profile-img-edit-block col-4">
                                <div className="profile-img-edit-pic"></div>
                                <div className="profile-img-buttons">
                                    <button className="profile-img-del">Del</button>
                                    <button className="profile-img-edit">Edit</button>
                                </div>
                            </div>
                            <div className="profile-info-wrapper col-7">
                                <label htmlFor="login-edit">Login:</label>
                                <input className="profile-info login-edit" name='login-edit'/>
                                <label htmlFor="email-edit">Email:</label>
                                <input className="profile-info email-edit" name='email-edit'/>
                                <label htmlFor="password-edit">Password:</label>
                                <input className="profile-info password-edit" name='password-edit'/>
                            </div>
                            <div className="profile-btns-wrapper col-12">
                                <button className="profile-del">Delete profile</button>
                                <button className="profile-cancel">Cancel</button>
                                <button className="profile-save">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}