import React from "react";
import {Link, withRouter} from 'react-router-dom';
import './_SelectRooms.css';

class SelectRooms extends React.Component {
    constructor(props){
        super(props);
        this.state={
            grup:this.props.roomYouNow,
            users:[],
            check:false,
            img:null
        }

    }

    pushHistory = () =>{
        this.props.shouldComponentUpdate(this.props.history.id);
        this.setState({grup:this.props.history})
    };

    getpeopleonchat = () =>{
        var body = JSON.stringify({token:localStorage.getItem('user_token'), grup:this.state.grup})
        if(this.state.check === false){
            this.setState({check:true})
            fetch(`/getpeopleonchat`, {
                method: 'POST',
                headers: { "Content-Type": "application/json"}, 
                body: body
            })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                res.map( item =>
                {return item.grups?item.grups.map( i => {i === this.state.grup?this.setState({users:[...this.state.users, {name: item.name, onlineImg: item.userImg}]}):null}):null}
                );
            })
            .catch(err => console.log(err));
        }
    };

    render(){
        return(
            <div className="left-bar-wrapper d-none d-md-block col-12 col-md-3">
                <div className="rooms">
                    <div className="rooms-height">
                        <div className=" top-selector">
                            <div className="type-select">
                                <Link to={'/chat/'+this.props.roomYouNow+"/people"} className='select-img select-ppl'><i className="fa fa-users" aria-hidden="true"></i></Link>
                            </div>
                            <div className="type-select">
                                <Link to={'/chat/'+this.props.roomYouNow+"/grup"}  className='select-img select-groups'><i className="fa fa-comments-o" aria-hidden="true"></i></Link>
                            </div>
                        </div>
                        <div className="rooms-list">
                           <div className="rooms-groups-list">
                               {this.props.location.pathname === "/chat/" + this.props.roomYouNow + "/grup" || this.props.location.pathname === "/chat/" + this.props.roomYouNow?this.props.allgrup.map((item, i) => {return <Link key={i} to={'/chat/'+item} className="room-select" onClick={this.pushHistory}>{item}</Link>}):null}
                           </div>
                               {this.props.location.pathname === "/chat/" + this.props.roomYouNow + "/people"?<div className='sidebar-ppl'>{this.getpeopleonchat()}
                                   {this.state.users.length === 0?<p className='loader'></p>:this.state.users.map((item,index)=>{return <div key={index}><div className="LogoUser" style={item.onlineImg === null ? null : {backgroundImage: 'url('+ require("../../img/"+item.onlineImg+".jpg")+')'}}></div><p key={index} >{item.name}</p></div>})}</div>:null}

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(SelectRooms)