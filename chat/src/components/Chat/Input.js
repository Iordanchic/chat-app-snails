import React, { Component } from 'react';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import {Route, Link} from 'react-router-dom';
// import io from 'socket.io-client';
// const socket = io('http://localhost:8000');``

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state={
            msgs:[]}
    }

    msgon = (event) =>{
        if(event.key === 'Enter'){
            var objmsg={
                date:"",
                msg:"",
                author:""
            }
            var b=new Date()
            objmsg.date= b.getDate() + '-' + (b.getMonth() + 1) + '-' + b.getFullYear();
            objmsg.msg = this.refs.msg.value;
            this.props.socket.emit('msgtochat', objmsg);
            // fetch("http://localhost:3001/msgtobd",
            // {
            //     method: "POST",
            //     mode: 'no-cors',
            //     credentials: 'same-origin',
            //     headers: {
            //         // 'Access-Control-Allow-Origin':'http://localhost:3000',
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json'
            //       },
            //     body:JSON.stringify({
            //         body:{
            //             msg:this.refs.msg.value, 
            //             date:c
            //         }
            //     }),
            // })
            //     .then(res => res.json()) 
            //     .then(data =>{console.log('Created Gist:' + data)});
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