import React, { Component } from 'react';
// import {connect} from 'react-redux';
import Messeg from './Messege';
// import Footer from '../components/Footer';
// import {bindActionCreators} from 'redux';
// import {Route, Link} from 'react-router-dom';
// import {objmsg} from '../actions';
import io from 'socket.io-client';
import Input from './Input';
// import SelectRooms from "../components/SelectRooms"
const socket = io('http://localhost:8000');
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
        <div className='container'>
            {/* <Header /> */}
            <div className="main-chat-wrapper">
            {/* <SelectRooms /> */}
            <div className="App">
                <div id="Allmsg">
                    {this.state.msgs.map((item,index) => {return <Messeg msgs={item} index={index} date={this.state.date[index]}/>})}
                    {/* {this.state.msgs.map((item, index)=>{
                        return <div key={index}className="OneMsg"><div className="LogoUser"></div><div className="Msg">
                        <p className="UserName">User</p><p>at</p><p className="Data">{this.state.date[index]}</p><hr/>
                        <p className="Text">{item}</p></div></div>
                    })} */}
                </div>
                <div className="type">
                    <Input socket={socket}/>
                </div>
                </div>
                </div>
            {/* <Footer /> */}

            </div>
        )
    }
}