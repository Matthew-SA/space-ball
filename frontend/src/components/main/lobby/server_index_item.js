import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import $ from "jquery";

class ServerIndexItem extends React.Component {
  // constructor(props){
  //   super(props)
  // }

  eventListeners(){
    let that = this;
    
    //this jquery gives hover class to each server index item
    $(`#server-${this.props.room}`).hover(
      function() {
        $(`#server-${that.props.room}`).addClass("room-hover");
      },
      function() {
        $(`#server-${that.props.room}`).removeClass("room-hover");
      }
    );
  };

  componentDidMount(){
    this.eventListeners();
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
          className="server-columns"
          id={`server-${this.props.room}`}
          key={this.props.i}
        >
          <div>#00{this.props.room}</div>
          <div>{this.props.numPlayers}/6</div>
        </div>
      </Link>
    );
  }
}

export default withRouter(ServerIndexItem);