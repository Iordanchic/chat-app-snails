import React, { Component } from 'react';
// import {connect} from 'react-redux';
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
            msgs:[]
        }
    }

    componentDidMount(){
        var a;
        var b;
        var c;
        socket.on('msgfromchat', (msg) => {
            a=msg;
            b=new Date()
            c=b.getFullYear() + '-' + (b.getMonth() + 1) + '-' + b.getDate();
            this.setState({date:[...this.state.date, c],
                msgs:[...this.state.msgs, a]})
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
                        {this.state.msgs.map((item, index)=>{
                            return <div key={index}className="OneMsg row">
                                <div className="LogoUser col-1"></div>
                                <div className="col-11">
                                    <div className="Msg row">
                                        <p className="UserName col-9">User</p>
                                        <div className="data-info col-3">
                                            <p className='data-written'>written on  </p>
                                            <p className="Data">  {this.state.date[index]}</p>
                                        </div>
                                        <hr/>
                                        <p className="Text">{item}</p>
                                    </div>
                                </div>
                            </div>
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