import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './_Header.css';

export default class Header extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <header>
            <div className="header row">
            <Link to={'/chat'} style={{backgroundImage: 'url('+ require("../../img/logo.png")+')'}} className='logo col-1 offset-1'></Link>
            <div className="profile-block col-1 offset-9">
            <div className="profile-img"></div>
            <Link to={'/profile'} className='my-profile'>My profile</Link>
        </div>
        </div>

        </header>
    )
    }
}