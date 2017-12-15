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
        // console.log(this)
        this.props.handleImgChoose();
        console.log(this.props.item)
        this.setState({
            data: 1
        })
    };
    render(){
        return (
            <div className="wrap">
                <div ref='block' data-id={this.props.item} className="profile-img-edit-pic" style={this.state.data !== 1 ? {backgroundImage: 'url('+ require("../../img/"+this.props.item+".jpg")+')'}:{backgroundImage: 'url('+ require("../../img/"+this.props.item+".jpg")+')', border: "2px solid"} } onClick={this.handleImgs}></div>
            </div>

        )
    }
}

// withRouter(Profile)