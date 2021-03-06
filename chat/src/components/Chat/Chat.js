import React, { Component } from 'react';
import Messege from './Messege';
import SelectRooms from '../SelectRooms/SelectRooms';
import './_Chat.css';
import { BrowserRouter, withRouter} from 'react-router-dom'
import io from 'socket.io-client';
import Input from './Input';
const socket = io('http://localhost:8001');

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
            scrollCheck: true,
        }
    }

    deleteMsg = (i) => {
        this.state.msgs.splice(i, 1);
        this.setState({msgs: this.state.msgs});

        let data = JSON.stringify({token: localStorage.getItem("user_token"), group: this.state.grup, index: i});
        fetch(`/deleteMsgs`, { 
            method: 'POST',
            headers: { "Content-Type": "application/json"}, 
            body: data
        })
        .then(res => res.json())
        .then(res => {

        })
        .catch(err => console.log(err));
    }

    scrollFunn = () => {
        this.refs.allmsg.scrollTop = this.refs.allmsg.scrollHeight;
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
            this.setState({msgs:res.msgs, scrollCheck: false})
            this.refs.allmsg.scrollTop = this.refs.allmsg.scrollHeight;
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
            this.setState({author:res.name, allgrup:res.grups})
        })
        .catch(err => console.log(err));
    };
    
    componentDidMount(){
        this.getmsgs();
        this.getlogin();

        socket.on('msgfromchat', (objmsg) => {
            if(objmsg.grup === this.state.grup){
                this.setState({msgs:[...this.state.msgs, objmsg.msgs]})
            }
        })
    }

    render() {
        return (
            <div key={this.state.render} className="main-chat-wrapper">
                <div className="row main-chat-row">
                    <SelectRooms allgrup={this.state.allgrup} roomYouNow={this.state.grup} usersOnGrup={this.state.users} user={this.state.user}/>
                    <div className="col-12 col-md-9">
                        <div className="App">
                            <div ref="allmsg" id="Allmsg">
                                {this.state.msgs.length == 0?<p className='loader'>loading</p>:
                                    this.state.msgs.map((item,index, arr) => {
                                        return <Messege  userImg={item.img} deleteMsg={this.deleteMsg} owner={item.author === this.state.author ? true : false} item={item} key={index} arr={arr} index={index}/>
                                    })
                                }
                            </div>
                            <div className="chat-input">
                                <Input userImg={this.state.img} user={this.state.author} Allmsg={this.refs.Allmsg} img={this.state.img} grup={this.state.grup} socket={socket} udateComponentsMessege={this.udateComponentsMessege}/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}