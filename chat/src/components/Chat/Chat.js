import React, { Component } from 'react';
import Messege from './Messege';
import SelectRooms from '../SelectRooms/SelectRooms';
import './_Chat.css';
import { BrowserRouter, withRouter} from 'react-router-dom'
// import Footer from '../components/Footer';
// import {bindActionCreators} from 'redux';
// import {Route, Link} from 'react-router-dom';
// import {objmsg} from '../actions';
import io from 'socket.io-client';
import Input from './Input';
// import SelectRooms from "../components/SelectRooms"
const socket = io('http://localhost:8001');
// const mapDispatchToProps = dispatch => ( bindActionCreators({objmsg}, dispatch) );

// @connect(null, mapDispatchToProps)
export default class Chat extends Component {
    constructor(props) {
        let data = JSON.stringify({token: localStorage.getItem("user_token")});
        fetch(`/test`, { 
            method: 'POST', 
            headers: { "Content-Type": "application/json"}, 
            body: data
        })
        .then(res => res.json())
        .then(res => {
            if(res.success === false) {
                this.setState({access: false})
            } else {
                this.setState({access: true, user:res.name, img: res.img})
            }

        })
        .catch(err => console.log(err));
        super(props);
        this.state={
            access: null,
            grup:this.props.match.params.id,
            msgs:[],
            author:"",
            userongrup:"",
            allgrup:[],
        }
    }

    getmsgs = () =>{
        var body = JSON.stringify({token:localStorage.getItem('user_token'), grup:this.state.grup})
        fetch(`/beginchat`, {
            method: 'POST',
            headers: { "Content-Type": "application/json"}, 
            body: body
        })
        .then(res => res.json())
        .then(res => {
            this.setState({msgs:res.msgs})
        })
        .catch(err => console.log(err));
    };
    
    getlogin = () =>{
        var body = JSON.stringify({token:localStorage.getItem('user_token')})
        fetch(`/getllogin`, {
            method: 'POST',
            headers: { "Content-Type": "application/json"}, 
            body: body
        })
        .then(res => res.json())
        .then(res => {
            // console.log(res)
            this.setState({author:res.name, allgrup:res.grups})
        })
        .catch(err => console.log(err));
    };
    
    componentDidMount(){
        this.getmsgs();
        this.getlogin();

        socket.on('msgfromchat', (objmsg) => {
            if(objmsg.grup == this.state.grup){
                this.setState({msgs:[...this.state.msgs, objmsg.msgs]})
            }
        })
    }

    render() {
        console.log(this.state)
        return (
            <div key={this.state.render} className="main-chat-wrapper">
                <div className="row main-chat-row">
                    <SelectRooms allgrup={this.state.allgrup} roomYouNow={this.state.grup} usersOnGrup={this.state.users} user={this.state.user}/>
                    <div className="App col-11 col-sm-9">
                        <div ref="Allmsg" id="Allmsg">
                            {this.state.msgs.length == 0?<p className='loader'>loading</p>:
                                this.state.msgs.map((item,index, arr) => {
                                    // if(this.state.msgs.length == index){
                                    //     return <Messege item={item} key={index} />    
                                    // }
                                    return <Messege item={item} key={index} arr={arr} index={index}/>
                                })
                            }
                        </div>
                        <div className="chat-input">
                            <Input user={this.state.author} Allmsg={this.refs.Allmsg} img={this.state.img} grup={this.state.grup} socket={socket} udateComponentsMessege={this.udateComponentsMessege}/>

                        </div>
                    </div>
                </div>
            </div>
            // </div>
            
        )
    }
}