import React, { Component } from 'react';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
import {Route, Link} from 'react-router-dom';
import io from 'socket.io-client';
// const socket = io('http://localhost:8000');``

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state={
            msgs:[]}
    }

    msgon = (event) =>{
        if(event.key == 'Enter'){
            this.props.socket.emit('msgtochat',this.refs.msg.value);
            var b=new Date()
            var c= b.getDate() + '-' + (b.getMonth() + 1) + '-' + b.getFullYear();
            fetch('http://localhost:9001/msgtobd',
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    // 'Content-Type': 'application/json',
                  },
                body:JSON.stringify({
                    msg:this.refs.msg.value, 
                    date:c
                })
            }).then(function(res) {
                    return res.json();
                }).then(function(data) {
                    console.log('Created Gist:');
                });
            this.refs.msg.value="";
        }
    }

    render() {
        return (
            <div className="type">
                <input type="text" className="msg" ref="msg" defaultValue="" onKeyPress={this.msgon}/>
            </div>
        )
    }
}