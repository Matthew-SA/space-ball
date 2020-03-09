import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import $ from 'jquery';

class ServerIndexItem extends React.Component {
  constructor(props){
    super(props)
    this.room = this.props.room
    this.socket = this.props.socket

    this.state = {
      isLive: false,
      numPlayers: null,
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
    this.socket.emit('request-update', this.room)
    this.socket.on(`update-${this.room}`, data => {
      this.setState({
        numPlayers: data
      })
    })
    this.socket.on(`start-${this.room}`, data => {
      this.setState({
        isLive: data
      })
    })
  }

  componentWillUnmount() {
    this.socket.off(`update-${this.room}`)
    this.socket.off(`start-${this.room}`)
  }

  render(){
    if (!this.state.isLive) {
      return ( 
        <Link
          to={{
            pathname: "/room",
            room: this.room,
            numPlayers: this.state.numPlayers,
            socket: this.socket,
            user: this.props.user,
            gameoptions: this.props.gameoptions
          }}>
          <div className="server-columns" id={`server-${this.props.room}`}>
            <div>#00{this.props.room}</div>
            <div>{this.state.numPlayers}/6</div>
          </div>
        </Link>
      );
    } else {
      return  (
        <div className="server-columns" id={`server-${this.props.room}`}>
          <div>#00{this.props.room}</div>
          <div>{this.state.numPlayers}/6</div>
        </div>
      )
    }
  }
}

export default withRouter(ServerIndexItem);