import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

export default class Messege extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // console.log(this.props.item["msgs"]);
        return (
                <div className="OneMsg row">
                    <div className="LogoUser col-1"></div>
                        <div className="col-11">
                            <div className="Msg row">
                                <p className="UserName col-9">{this.props.item.user}</p>
                                <div className="data-info col-3">
                                    <p className='data-written'>written on  </p>
                                    <p className="Data"> {this.props.item.date}</p>
                                </div>
                                <hr/>
                            <p className="Text">{this.props.item.msg}</p>
                        </div>
                    </div>
                </div>
        )
    }
}