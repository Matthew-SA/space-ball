import React from "react";
import { Link } from "react-router-dom";
import { Route, withRouter } from "react-router-dom";

class ServerIndexItem extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <Link
        to={{
          pathname: "/room",
          room: this.props.room,
          numPlayers: 1,
          socket: this.props.socket,
          user: this.props.user,
          gameoptions: this.props.gameoptions
        }}
      >
        <div
          className="server-list"
          id={`server-${this.props.room}`}
          key={this.props.i}
        >
          <div className="server-column"># {this.props.room}</div>
          <div className="server-column">{this.props.numPlayers} Players</div>
        </div>
      </Link>
    );
  }
}

export default withRouter(ServerIndexItem);