import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './_Profile.css';
import { withRouter } from 'react-router-dom';
import ProfileImg from './ProfileImg';



class Profile extends Component {
    constructor(props) {
        super(props);
        let data = JSON.stringify({token: localStorage.getItem("user_token")});
        fetch(`/test`, { method: 'POST', headers: { "Content-Type": "application/json"}, body: data})
            .then(res => res.json())
            .then(res => {
                console.log("res", res);
                if(res.success === false) {
                    this.setState({access: false})
                } else {
                    this.setState({access: true, name: res.name, img: res.img, chosenImg:res.img, id: res.id})
                }

            })
            .catch(err => console.log(err));
        this.state = {
            addgrup: false,
            access: null,
            name: null,
            img: null,
            modalVisibility: false,
            saveBtn: false,
            imgArr: ['icon1', 'icon2', 'icon4', 'icon5', 'icon6', 'icon7', 'icon8', 'icon9', 'icon10', 'icon11', 'icon12', 'icon13', 'icon14', 'icon15', 'icon16'],
            chosenImg: null,
            userstogrup:[]
        }
    }

    handleSave = () => {
        let data = JSON.stringify({
            newname: this.refs.login.value,
            oldname: this.state.name,
            newpassword: this.refs.password.value,
            id: this.state.id,
            newImg: this.state.img,
            token: localStorage.getItem("user_token")
        });
        fetch(`/changeProfile`, {method: 'POST', headers: {"Content-Type": "application/json"}, body: data})
            .then(res => res.json())
            .then(res => {
                console.log("res", res);

            })
            .catch(err => console.log(err));
        this.setState({
            name: this.refs.login.value,
        });
        setTimeout(() => {
            window.location.reload();
        }, 1000)
    }

    handleDelete = () =>{
        let data = JSON.stringify({id: this.state.id, token: localStorage.getItem("user_token")});
        fetch(`/deleteProfile`, { method: 'POST', headers: { "Content-Type": "application/json"}, body: data})
            .then(res => res.json())
            .then(res => {
                console.log("res", res);

            })
            .catch(err => console.log(err));
            localStorage.removeItem('user_token');
            this.props.history.push('/signup')
    };

    handleLogOut = () => {
        localStorage.removeItem('user_token');
        this.props.history.push('/login')
    };
    handleEditImg = () => {
        this.setState({
            modalVisibility: !this.state.modalVisibility
        })
    };
    handleImgChoose = (a) => {
        this.setState({img: a,
            modalVisibility: !this.state.modalVisibility,
            saveBtn: true
        });
    };

    addgrup = () =>{
        if(this.state.addgrup == false){
            this.setState({addgrup:true})
        }else{
            this.setState({addgrup:false})
        }
    };

    handleAdd = () =>{
        let data = JSON.stringify({grup:this.refs.grup.value, admin:this.state.name, token: localStorage.getItem("user_token"), users:this.state.userstogrup});
        fetch(`/addNewGrup`, { 
            method: 'POST', 
            headers: { "Content-Type": "application/json"}, 
            body: data
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);

            })
            .catch(err => console.log(err));
        // this.refs.grup.value = null;
        this.props.history.push(`/chat/${this.refs.grup.value}`)
    };

    search = () =>{
        let data = JSON.stringify({user:this.refs.user.value, token: localStorage.getItem("user_token")});
        fetch(`/searchuser`, { 
            method: 'POST', 
            headers: { "Content-Type": "application/json"}, 
            body: data
        })
            .then(res => res.json())
            .then(res => {
                if(this.state.userstogrup === null){
                    this.setState({userstogrup:[...this.state.userstogrup, res]})
                }else if(this.state.userstogrup.findIndex(i => i.name === res.name) === -1){
                    this.setState({userstogrup:[...this.state.userstogrup, res]})
                }
            })
            .catch(err => console.log(err));
        this.refs.user.value = null;
    }

    render() {
        return (
            <div className='profile-container'>
                {this.state.access === null? <h1 className='loader'> Loading </h1> : this.state.access === true?
                    <div className="profile-wrapper">
                    {this.state.addgrup==true?

                    //====== Add new group
                        <div className="row">
                            <h1 className='profile-heading col-sm-12'>Add group</h1>
                            <div className="profile-left-sidebar col-12 col-md-3">
                                <div className="row">
                                    <button className="profile-btn exit-account col-12" onClick={this.addgrup}>Return to profile</button>
                                </div>
                            </div>
                            <div className="profile-main col-12 col-md-8">

                                <div className="row">
                                    <div className="col-12 col-md-7">
                                        <div className="profile-info-wrapper">
                                            <label htmlFor="login-edit">Name of the group:</label>
                                            <input ref='grup' className="profile-info login-edit" name='login-edit' defaultValue="" required/>
                                            <label htmlFor="login-edit">Add user:</label>
                                            <input ref='user' className="profile-info login-edit" name='login-edit' defaultValue="" required/>
                                            <button className="profile-btn exit-account col-12" onClick={this.search}>Search user</button>
                                            <div className='user-add'>
                                                <ul>
                                                    {this.state.userstogrup === null?<li>null</li>:this.state.userstogrup.map((item,index) => {return <li key={index}><div className="LogoUser" style={{backgroundImage: 'url('+ require("../../img/"+item.userImg+".jpg")+')'}}></div>{item.name}</li>})}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profile-btns-wrapper col-12">
                                        <button className={this.state.saveBtn === true ? "profile-save unsaved" : "profile-save"} onClick={this.handleAdd}>Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>:

                    //====== Profile
                        <div className="row">
                            <h1 className='profile-heading col-sm-12'>Profile settings</h1>
                            <div className="profile-left-sidebar col-12 col-md-3">
                                <div className="row">
                                    <button className="profile-btn user-account col-12">User account</button>
                                    <button className="profile-btn exit-account col-12" onClick={this.addgrup}>Add group</button>
                                    <button className="profile-btn exit-account col-12" onClick={this.handleLogOut}>Logout</button>
                                </div>
                            </div>

                            <div className={this.state.modalVisibility ? "modal-window col-12" : "modal-none" +
                                " modal-window col-12"}>
                                <h1>Choose your new account image:</h1>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="profile-img-edit-block d-flex justify-content-center flex-wrap">

                                            {this.state.imgArr.map((item, i) => {
                                                return <ProfileImg data={null} key={i} item={item} i={i} handleImgChoose={this.handleImgChoose}/>
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="profile-img-buttons">
                                    <div className="row d-flex justify-content-center">
                                        <button className="profile-img-edit img-choose  col-3" onClick={this.handleEditImg}>Close</button>
                                    </div>
                                </div>
                            </div>


                            <div className="col-12 col-md-8">
                                <div className="profile-main">
                                    <div className="row">
                                        <div className="col-12 col-md-4">
                                            <div className="profile-img-edit-block">
                                                <div  className="profile-img-edit-pic" style={{backgroundImage: 'url('+ require("../../img/"+this.state.img+".jpg")+')'}}></div>
                                                <div className="profile-img-buttons">
                                                    <button className="profile-img-edit" onClick={this.handleEditImg}>Edit</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-md-7">
                                            <div className="profile-info-wrapper">
                                                <label htmlFor="login-edit">Login:</label>
                                                <input ref='login' className="profile-info login-edit" name='login-edit' defaultValue={this.state.name} required/>
                                                <label htmlFor="password-edit">New Password:</label>
                                                <input type='password' ref='password' className="profile-info password-edit" name='password-edit' placeholder='Your new password' required/>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="profile-btns-wrapper">
                                                <button className="profile-del"  onClick={this.handleDelete}>Delete profile</button>
                                                <Link to={'/chat/main'} className="profile-cancel">Back to chat</Link>
                                                <button className={this.state.saveBtn === true ? "profile-save unsaved" : "profile-save"} onClick={this.handleSave}>Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    </div>: <h1> Access DENIED. Log in please </h1>}
            </div>

        )
    }
}

export default withRouter(Profile)