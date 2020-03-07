import React from 'react'
import NavBarContainer from "../navbar/navbar_container";
import GameView from "../../game/gameview_container"

class Room extends React.Component {
  constructor(props) {
    super(props)
    this.socket = this.props.location.socket;
    this.room = this.props.location.room;

    this.state = {
      live: false,
      numPlayers: 0,
      neutral: [],
      redTeam: [],
      blueTeam: [],
    }
  }

  componentDidMount() {
    this.socket.emit('enter-room', this.room);
    this.socket.emit('join-game', {
      username: this.props.location.user,
      room: this.room,
      options: this.props.location.gameoptions
    })

    this.socket.on('start-game', () => {
      this.setState({ live: true })
      console.log(this.state)
    })
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.emit('leave-game', this.room);
      this.socket.emit('leave-room', this.room);
      this.socket.disconnect();
    }
  }

  render() {
    if (!this.room) window.location.href = "/play";
    console.log(this.state)

    if (this.state.live) {
      return <GameView room={this.room} socket={this.socket}/>
    } else {
      return (
        <div className="mainpage-container">
          <NavBarContainer />
          <div className="lobby-content">
            <div className="box">
              <div className="room-welcome-header">
                Welcome to Room #00{this.room}
              </div>
  
              <div className="room-column-headers">
                <div>RED</div>
                <div>-------</div>
                <div>BLUE</div>
              </div>

              <div className="teams">
                <div className="red-team">
                  {/* {red.map((player, i) => (
                    <div>{player}</div>
                  ))} */}
                </div>

                <div className="no-team">
                  {/* {red.map((player, i) => (
                    <div>{player}</div>
                  ))} */}
                </div>
  
                <div className="blue-team">
                  {/* {blue.map((player, i) => (
                    <div>{player}</div>
                  ))} */}
                </div>
              </div>

              <div className="play" onClick ={() => this.socket.emit('request-game-start', this.room)}>
                Start Game
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Room;