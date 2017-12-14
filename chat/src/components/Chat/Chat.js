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
        super(props);
        this.state={
            grup:this.props.match.params.id,
            msgs:[],
            user:"user",
            userongrup:"",
            allgrup:[{grup:"main"},{grup:"main2"}]
        }
    }

    getmsgs = () =>{
        socket.emit('beginchat',(this.state.grup))
        socket.on('beginchat', (objoldmsg)=>{
            if(objoldmsg != null){
            this.setState({
                msgs:objoldmsg.msgs
            })
        }else{
            console.log('no grup')
        }
        })
        // socket.emit('getallgrupuser',(this.state.user))
        // socket.on('getallgrupuser',)
    }

    componentDidMount(){
        this.getmsgs();

        socket.emit('getlogin',({email:"2"}))

        socket.on('getlogin', (objlogin)=>{
            this.props.getUserInfo(objlogin)
        })

        socket.on('msgfromchat', (objmsg) => {
            console.log(objmsg.msgs)
            if(objmsg.grup == this.state.grup){
                this.setState({msgs:[...this.state.msgs, objmsg.msgs]})
            }
        })
    }
    chanInGrup = (grup) =>{
        this.setState({
            grup:grup
        })
        this.forceUpdate()
    }

    render() {
        // console.log(this.state)
        return (
            <div key={this.state.render} className="main-chat-wrapper">
                <div className="row">
                    <SelectRooms roomYouNow={this.state.grup} chanInGrup={this.chanInGrup} usersOnGrup={this.state.users} user={this.state.user} grups={this.state.allgrup} history={this.props.match.params}/>
                    <div className="App col-9">
                        <div id="Allmsg">
                            {this.state.msgs.length == 0?<p>loading</p>:
                                this.state.msgs.map((item,index) => {
                                    return <Messege item={item} key={index} />
                                })
                            }
                        </div>
                        <div className="chat-input">
                            <Input user={this.state.user} grup={this.state.grup} socket={socket} udateComponentsMessege={this.udateComponentsMessege}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}