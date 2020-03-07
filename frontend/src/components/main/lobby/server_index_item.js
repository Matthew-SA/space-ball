import React from "react";
import { Link } from "react-router-dom";
import { Route, withRouter } from "react-router-dom";
import $ from 'jquery';

class ServerIndexItem extends React.Component {
  constructor(props){
    super(props)
    this.room = this.props.room
    this.socket = this.props.socket

    this.state = {
      numPlayers: 1,
    }
  }

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
    this.socket.on('update-' + this.room, data => {
      this.setState({
        numPlayers: data
      })
    })
  }

  componentWillUnmount() {

  }

  render(){
    return (
      <Link
        to={{
          pathname: "/room",
          room: this.room,
          numPlayers: this.state.numPlayers,
          socket: this.socket,
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
          <div>{this.state.numPlayers}/6</div>
        </div>
      </Link>
    );
  }
}

export default withRouter(ServerIndexItem);