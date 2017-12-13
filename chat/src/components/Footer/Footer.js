import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './_Footer.css';

export default class Footer extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <footer className='footer '>
                <div className="row">
                    <div className="col-12">
                        Scrumi.org
                    </div>
                </div>
            </footer>

        )
    }
}