import React, { Component } from 'react';
// import {connect} from 'react-redux';
import Messeg from './Messege';
import SelectRooms from '../SelectRooms/SelectRooms';
import './_Chat.css';
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
            date:[],
            msgs:[],
            author:[]
        }
    }
    componentWillMount(){
        socket.on('beginchat', (objoldmsg)=>{
            this.setState({
                date:[...this.state.date, objoldmsg.date],
                msgs:[...this.state.msgs, objoldmsg.msg],
                author:[...this.state.author, objoldmsg.author]
            })
        })
    };

    componentDidMount(){
        socket.on('msgfromchat', (objmsg) => {
            this.setState({
                date:[...this.state.date, objmsg.date],
                msgs:[...this.state.msgs, objmsg.msg],
                author:[...this.state.author, objmsg.author]
            })
                // this.props.objmsg(this.state);
        });
    }

    render() {
        return (
            <div className="main-chat-wrapper">
                <div className="row">
                    <SelectRooms />
                    <div className="App col-9">
                        <div id="Allmsg">
                            {this.state.msgs.map((item,index) => {
                                console.log(item);
                                return <Messeg msgs={item} index={index} date={this.state.date[index]}/>
                                })}
                        </div>
                        <div className="chat-input">
                            <Input socket={socket}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}