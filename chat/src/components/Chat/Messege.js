import React, { Component } from 'react';

export default class Chat extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div key={this.props.index}className="OneMsg row">
            <div className="LogoUser col-1"></div>
            <div className="col-11">
                <div className="Msg row">
                    <p className="UserName col-9">User</p>
                    <div className="data-info col-3">
                        <p className='data-written'>written on  </p>
                        <p className="Data">  {this.props.date}</p>
                    </div>
                    <hr/>
                    <p className="Text">{this.props.msgs}</p>
                </div>
            </div>
        </div>
        )
    }
}