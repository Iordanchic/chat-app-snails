import React from 'react';


export default class MainLayout extends React.Component {
    constructor(props) {
        super(props)
        
    }


    render() {
        return(
            <div className='mainLayOut'>
                {this.props.children}
            </div>
        )
    }
}