import React, { Component } from 'react';
import './_Welcome.css';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';


class Welcome extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='bg-color'>
               <div className="row">
                   <div className='col-12 login-wrap'>
                       <div className='login-form'>
                           <h1> Welcome to our chat </h1>
                           <p>This is super cool new app from the coolest SnailsTeam</p>
                           <p>In this free trial app you can:</p>
                           <ul>
                               <li>Sign up and log in</li>
                               <li>Choose a group where you would like to chat</li>
                               <li>Send messages to your friends and enjoy the conversation</li>
                               <li>Look through the history of your chat</li>
                               <li>Choose a really nice given image for your userpic</li>
                               <li>Change your yousername or password in your personal profile if you wish to</li>
                           </ul>
                           <p>In a full version of this app you would be able to send emojes and upload files, create new groups, see your friends profiles, add favourites.</p>
                           <div className="links-wrapper">
                               <Link to={'signup'}>Sign Up </Link>
                               <span>or </span>
                               <Link to={'login'}>Log In </Link>
                           </div>


                       </div>
                   </div>
               </div>
            </div>
        )
    }
}
export default withRouter(Welcome)
