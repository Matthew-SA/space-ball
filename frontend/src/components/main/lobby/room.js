import React from 'react'
import { Link } from 'react-router-dom';
import NavBarContainer from "../navbar/navbar_container";

class Room extends React.Component {
  constructor(props) {
    super(props)
    this.socket = this.props.location.socket;
    this.room = this.props.location.room;
    this.numPlayers = this.props.location.numPlayers;
  }
  componentDidMount() {
    this.socket.emit('enter-room', this.room);
  }
  render() {
    if (!this.room) window.location.href = "/play";
    return (
      <div className="mainpage-container">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
        <NavBarContainer />
        <div className="lobby-content">
          <div className="box">
            <svg style={{width:"24px", height:"24px"}} viewBox="0 0 24 24">
              <path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
            </svg>
            <div>Welcome to room #{this.room}</div>
            <Link to={{
              pathname: "/game",
              room: this.room,
              socket: this.socket
            }}>
              <div className="play">Start Game</div>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Room;