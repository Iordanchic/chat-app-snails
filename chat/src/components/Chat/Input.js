import React, { Component } from 'react';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import {Route, Link} from 'react-router-dom';
// import io from 'socket.io-client';
// const socket = io('http://localhost:8000');``


export default class Chat extends Component {
    constructor(props) {
        super(props);
    }

    msgon = (event) =>{
        if(event.key === 'Enter'){
            var objmsg={
                grup:this.props.grup,
                msgs:{
                    date:"",
                    msg:"",
                    author:this.props.user
                }   
            };
            var b=new Date()
            objmsg.msgs.date= b.getDate() + '-' + (b.getMonth() + 1) + '-' + b.getFullYear();
            objmsg.msgs.msg = this.refs.msg.value;
            this.props.socket.emit('msgtochat', objmsg);
            this.refs.msg.value="";
        }
    };

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <div className="type">
                        <input type="text" className="msg" ref="msg" placeholder='Start typing here'  onKeyPress={this.msgon}/>
                    </div>
                </div>
            </div>
        )
    }
}