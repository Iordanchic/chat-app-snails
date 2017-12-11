import React from "react";
import {Link} from 'react-router-dom';
import './_SelectRooms.css';

export default class SelectRooms extends React.Component {
    constructor(props){
        super(props)

    }

    render(){
        return(
            <div className="left-bar-wrapper  col-3">
                <div className="rooms">
                    <div className="row">
                        <div className="top-selector col-12 text-center">
                            <div className="type-select">
                                <Link to={'/chat'} className='select-img select-ppl'><i className="fa fa-users" aria-hidden="true"></i></Link>
                            </div>
                            <div className="type-select">
                                <Link to={'/chat'}  className='select-img select-groups'><i className="fa fa-comments-o" aria-hidden="true"></i></Link>
                            </div>
                            <div className="type-select">
                                <Link to={'/chat'}  className='select-img select-all'><i className="fa fa-files-o" aria-hidden="true"></i></Link>
                            </div>
                        </div>
                        <div className="rooms-list col-12">
                            <Link to={'/chat'} className="room-select">Room 1</Link>
                            <Link to={'/chat'} className="room-select">Room 2</Link>
                            <Link to={'/chat'} className="room-select">Room 3</Link>
                            <Link to={'/chat'} className="room-select">Room 4</Link>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}