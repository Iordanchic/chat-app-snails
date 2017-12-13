import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

export default class Messege extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // console.log(this.props.item["msgs"]);
        return (
                <div className="OneMsg">
                   <div className="row justify-content-between">
                       <div className="col-1"><div className="LogoUser"></div></div>
                       <div className="col-11">
                           <div className="Msg">
                              <div className="row">
                                 <div className="col-12">
                                     <div className="msg-top">
                                         <div className="row">
                                             <p className="UserName col-9">{this.props.item.user} Vova</p>
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