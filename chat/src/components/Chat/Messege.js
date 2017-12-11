import React, { Component } from 'react';

export default class Chat extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div key={this.props.index}className="OneMsg">
            <div className="LogoUser"></div>
            <div className="Msg">
                <p className="UserName">User</p>
                <p>at</p>
                <p className="Data">{this.props.date}</p>
                <hr/>
                <p className="Text">{this.props.item}</p>
            </div>
        </div>
        )
    }
}