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
                    <Link to={'/chat'} style={{backgroundImage: 'url('+ require("../../img/logo.png")+')'}} className='logo col-3'></Link>
                    <div className="profile-block col-2 offset-7">
                        <div className="profile-img"></div>
                        <Link to={'/profile'} className='my-profile'>My profile <i className="fa fa-caret-down" aria-hidden="true"></i></Link>
                    </div>
                </div>

            </header>
    )
    }
}