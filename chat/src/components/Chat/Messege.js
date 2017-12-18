import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

export default class Messege extends Component {
    constructor(props) {
        super(props);
        this.state={
            name:this.props.item.author,
            img:null
        }
    }
    componentDidMount(){
        var data = JSON.stringify({token: localStorage.getItem('user_token'),name:this.state.name});
        fetch(`/getimgtomsg`, {
                method: 'POST',
                headers: { "Content-Type": "application/json"},
                body: data
            })
            .then(res => res.json())
            .then(res => {
                console.log("res", res);
                this.setState({img: res.userImg})
            })
            .catch(err => console.log(err));
    }
    render() {
        // console.log(this.props.item["msgs"]);
        return (
                <div className="OneMsg">
                   <div className="row ">
                       <div className="col-1">
                           <div className="LogoUser" style={this.state.img === null ? null : {backgroundImage: 'url('+ require("../../img/"+this.state.img+".jpg")+')'}}></div>
                       </div>
                       <div className="col-11">
                           <div className="Msg">
                              <div className="row">
                                 <div className="col-12">
                                     <div className="msg-top">
                                         <div className="row">
                                             <p className="UserName col-9">{this.props.item.author}</p>
                                             <div className="data-info col-3">
                                                 <p className='data-written'>written on  </p> <p className="Data"> {this.props.item.date}</p>
                                             </div>
                                         </div>
                                     </div>

                                 </div>
                                  <p className="Text col-12">{this.props.item.msg}</p>
                              </div>
                           </div>
                       </div>
                   </div>
                </div>
        )
    }
}