import React, { Component } from 'react';

export default class Login extends Component {
    constructor(props) {
        super(props);
    }
    getInfoFromServer = () => {
        
            let data = JSON.stringify({ info: "Hello from client", name: "Petya"});
            fetch(`/aaa`, { method: 'POST', headers: { "Content-Type": "application/json" }, body: data })
            .then(res => res.json())
            .then(res => {
               
                console.log("res", res)
            })
            .catch(res => console.log('error'));
          }
   
    render() {
        return (
            <div>
                <h1> LOGIN </h1>
                <button onClick={this.getInfoFromServer}> Check Post request </button>
            </div>
        )
    }
}
    
