import React, { Component } from 'react';
// import { BrowserRouter } from 'react-router-dom';

export default class Messege extends Component {
    constructor(props) {
        super(props);
        this.state={
            img:null,
            name:this.props.item.author
        }

    }
    handleDeleteMsg = () => {
        console.log(this.props.index)
        this.props.deleteMsg(this.props.index)
    }
    // componentDidMount(){
    //     var data = JSON.stringify({token: localStorage.getItem('user_token'),name:this.state.name});
    //     fetch(`/getimgtomsg`, {
    //             method: 'POST',
    //             headers: { "Content-Type": "application/json"},
    //             body: data
    //         })
    //         .then(res => res.json())
    //         .then(res => {
    //             this.setState({img: res.userImg})
    //         })
    //         .catch(err => console.log(err));
    // }

    render() {
        return (
                <div className="OneMsg">
                   <div className="row ">
                       <div className="col-12 col-sm-2 col-md-2 col-lg-1">
                           <div className="LogoUser" style={this.props.userImg === null ? null : {backgroundImage: 'url('+ require("../../img/"+this.props.userImg+".jpg")+')'}}></div>
                       </div>
                       <div className="col-12 col-sm-10 col-md-10 col-lg-11">
                           <div className="Msg">
                              <div className="row">
                                 <div className="col-12">
                                     <div className="msg-top">
                                         <p className="UserName">{this.props.item.author}</p>
                                         <div className="data-info">
                                             <p className='data-written'>written on  </p> <p className="Data"> {this.props.item.date}</p> {this.props.owner ? <p onClick={this.handleDeleteMsg} className="data-written comment-delete">X</p>:null}
                                         </div>
                                     </div>
                                 </div>
                                  <div className="col-12">
                                      <p className="Text">{this.props.item.msg}</p>
                                  </div>
                              </div>
                           </div>
                       </div>
                   </div>
                   {this.props.arr[this.props.index+1]?this.props.arr[this.props.index+1].date !== this.props.item.date?<div className="lineDate">{this.props.item.date}</div>:null:null}
                </div>
        )
    }
}