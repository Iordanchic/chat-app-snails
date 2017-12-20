import React from "react";
import {Link, Route, withRouter} from 'react-router-dom';
import './_SelectRooms.css';

class SelectRooms extends React.Component {
    constructor(props){
        super(props);
        this.state={
            grup:this.props.roomYouNow
        }

    }
    pushHistory = () =>{
        this.props.shouldComponentUpdate(this.props.history.id);
        this.setState({grup:this.props.history})
    };
    myFunction = () => {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    };
    render(){
        // console.log(this.props.location.pathname, "/" + this.props.roomYouNow + "/grup")
        return(
            <div className="left-bar-wrapper col-1 col-sm-2 col-md-3">
                <div className="rooms">
                    <div className="row">

                        {/*<div className="topnav" id="myTopnav">*/}
                            {/*<Link to={'/chat/'+this.props.roomYouNow+"/people"} className='active select-img'><i className="fa fa-users" aria-hidden="true"></i></Link>*/}
                            {/*<Link to={'/chat/'+this.props.roomYouNow+"/people"} className=' select-img' ><i className="fa fa-users" aria-hidden="true"></i></Link>*/}
                            {/*<Link to={'/chat/'+this.props.roomYouNow+"/people"} className=' select-img' ><i className="fa fa-users" aria-hidden="true"></i></Link>*/}
                            {/*<Link to={'javascript:void(0);'} className="icon" onClick={this.myFunction}>&#9776;</Link>*/}
                        {/*</div>*/}
                        <div className=" top-selector">
                            <div className="type-select">
                                <Link to={'/chat/'+this.props.roomYouNow+"/people"} className='select-img select-ppl'><i className="fa fa-users" aria-hidden="true"></i></Link>
                            </div>
                            <div className="type-select">
                                <Link to={'/chat/'+this.props.roomYouNow+"/grup"}  className='select-img select-groups'><i className="fa fa-comments-o" aria-hidden="true"></i></Link>
                            </div>
                            {/*<div className="type-select">*/}
                                {/*<Link to={'/chat/'+this.props.roomYouNow+"/all"}  className='select-img select-all'><i className="fa fa-files-o" aria-hidden="true"></i></Link>*/}
                            {/*</div>*/}
                        </div>
                        <div className="rooms-list col-12">
                            {this.props.location.pathname === "/chat/" + this.props.roomYouNow + "/grup" || this.props.location.pathname === "/chat/" + this.props.roomYouNow?this.props.allgrup.map(item => {return <Link to={'/chat/'+item} className="room-select" onClick={this.pushHistory}>{item}</Link>}):null}
                            {this.props.location.pathname === "/chat/" + this.props.roomYouNow + "/people"?<p>all people</p>:null}
                            {this.props.location.pathname === "/chat/" + this.props.roomYouNow + "/all"?<p>all</p>:null}
                            {/* {this.props.grups<1?<p>loading</p>:this.props.grups.map((item,index)=>{return <Link to={'/chat/'+item.grup} key={index} className="room-select" onClick={this.pushHistory}>{item.grup}</Link>})} */}
                            {/* <Link to={'/chat'} className="room-select">Room 1</Link>
                            <Link to={'/chat'} className="room-select">Room 2</Link>
                            <Link to={'/chat'} className="room-select">Room 3</Link>
                            <Link to={'/chat'} className="room-select">Room 4</Link> */}
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default withRouter(SelectRooms)