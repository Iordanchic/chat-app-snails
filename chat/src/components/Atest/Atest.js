import React from "react";

export default class Atest extends React.Component {
    constructor(props){
        super(props);

        // let data = JSON.stringify({ name: this.refs.login.value, password: this.refs.pass.value});
        // let data = JSON.stringify({ name: this.refs.login.value, password: this.refs.pass.value});
        console.log( localStorage.getItem("user_token"));
        let data = JSON.stringify({token: localStorage.getItem("user_token")});
        console.log(data);
        fetch(`/test`, { method: 'POST', headers: { "Content-Type": "application/json"}, body: data/*body: {token: localStorage.getItem("user_token")}*/})
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

    consoleLocal = () => {
        
    }

    render(){        
        return(
            <div>
                {this.state.access === null? <h1> Loading </h1> : this.state.access === true? <h1> Access true </h1> : <h1> Access DENIED </h1>}
                
            </div>
        )
    }
}