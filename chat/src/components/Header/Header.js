import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './_Header.css';

export default class Header extends Component {
    constructor(props) {
        super(props);
        let data = JSON.stringify({token: localStorage.getItem("user_token")});
        fetch(`/test`, { method: 'POST', headers: { "Content-Type": "application/json"}, body: data})
            .then(res => res.json())
            .then(res => {
                if(res.success === false) {
                    this.setState({access: false})
                } else {
                    this.setState({visible: true, access: true, name: res.name, img: res.img})
                }

            })
            .catch(err => console.log(err));
        this.state = {
            visible: false,
            access: null,
            name: null,
            img: null
        };
    }
    handleMenu = () => {
        var clickMenu = document.getElementsByClassName('left-bar-wrapper')[0];
        var arr = clickMenu.className.split(' ');
        var dNone = arr.indexOf('d-none');
        if(dNone > -1){
            arr.splice(dNone, 1);
            clickMenu.className = arr.join(' ');
            var arrow = document.getElementsByClassName('fa-bars')[0];
            var newArrow = arrow.className.replace('fa-bars', 'fa-times');
            arrow.className = newArrow;
            console.log(arrow.className)
        } else {
            clickMenu.className = clickMenu.className + ' d-none';
            var arrow = document.getElementsByClassName('fa-times')[0];
            var newArrow = arrow.className.replace('fa-times','fa-bars');
            arrow.className = newArrow;
        }

};



    render() {
        return (
            <header>
                <div className="row">
                    <div className="col-5 d-none d-md-block col-md-3 d-md-flex justify-content-center">
                        <Link to={'/chat/main'} style={{backgroundImage: 'url('+ require("../../img/logo.png")+')'}} className='logo '></Link>
                    </div>
                    <div className="burger-menu d-block d-md-none col-5">
                        <i className='fa fa-bars' aria-hidden="true" onClick={this.handleMenu}></i>
                        <i className=" cross fa fa-times" aria-hidden="true"></i>

                    </div>

                    <div className=" col-4 offset-3 col-md-2  offset-md-7">
                        <div className="profile-block">
                            {this.state.visible ? <Link to={'/profile'}><div className='profile-img-header-block'>
                                <div  className="profile-img-edit-pic-header" style={{backgroundImage: 'url('+ require("../../img/"+this.state.img+".jpg")+')'}}></div>
                                <Link to={'/profile'} className='my-profile'>My profile <i className="fa fa-caret-down" aria-hidden="true"></i></Link>
                                </div>
                                </Link> : null}
                        </div>

                    </div>
                </div>

            </header>
    )
    }
}