import React from "react";

import "./SelectRoomXS.css";

export default class SelectRoomsXS extends React.Component {
  constructor(props) {
    super(props)

    let data = JSON.stringify({ token: localStorage.getItem("user_token") });
    fetch(`/test`, { method: 'POST', headers: { "Content-Type": "application/json" }, body: data })
      .then(res => res.json())
      .then(res => {
        if (res.success === false) {
          this.setState({ access: false })
        } else {
          this.setState({ access: true, groups: res.groups });
        }

      })
      .catch(err => console.log(err));

    this.state = {
      access: null,
      groups: [],

    }
  }

  getRoomsDb() {

  }

  render() {
    return (
      <div className="row">
        {
          this.state.access === null ? <h1> Loading </h1> 
          
          : //Access True
          
          this.state.access === true ? 
          <div className="col-12">
            <div className="test">
              <h1> It's page for small display </h1>
              {this.state.groups.map((item, i) => {
                return(
                  <div key={i}>
                    {item}
                  </div>)
              })}
            </div>
          </div> 
          
          : // Access Denied
          
          <h1> Access DENIED </h1>

        }
      </div>


    )
  }
}