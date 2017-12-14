import React from "react";

export default class Atest extends React.Component {
    constructor(props){
        super(props);
        // console.log( localStorage.getItem("user_token"));
        let data = JSON.stringify({token: localStorage.getItem("user_token")});
        fetch(`/test`, { method: 'POST', headers: { "Content-Type": "application/json"}, body: data})
        .then(res => res.json())
        .then(res => {
            console.log("res", res);
            if(res.success === false) {
                this.setState({access: false})
            } else {
                this.setState({access: true})
            }

        })
        .catch(err => console.log(err));


        this.state = {
            access: null,
        }
    }

    render(){        
        return(
            <div>
                {this.state.access === null? <h1> Loading </h1> : this.state.access === true? <h1> Access true </h1> : <h1> Access DENIED </h1>}
                
            </div>
        )
    }
}