import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
// import './_Profile.css';
// import { withRouter } from 'react-router-dom';

export default class ProfileImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }

    }
    handleImgs = () => {
        this.props.handleImgChoose(this.props.item);
    };
    render(){
        return (
            <div className="wrap">
                <div ref='block' data-id={this.props.item} className="profile-img-edit-pic" style={{backgroundImage: 'url('+ require("../../img/"+this.props.item+".jpg")+')'}} onClick={this.handleImgs}></div>
            </div>

        )
    }
}

// withRouter(Profile)