import React from 'react'
import NavBarContainer from "../navbar/navbar_container";
import GameView from "../../game/gameview_container"

class Room extends React.Component {
  constructor(props) {
    super(props)
    if (!this.props.location.room) window.location.href = "/";

    this.socket = this.props.location.socket;
    this.room = this.props.location.room;
    this.user = this.props.location.user === 'Guest' ? 'Guest' : this.props.location.user.username
    this.team = null;

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
      username: this.user,
      room: this.room,
      options: this.props.location.gameoptions
    })

    this.socket.on('update-listing', playerListings => {
      this.setState({ 
        neutral: playerListings.neutral,
        redTeam: playerListings.redTeam,
        blueTeam: playerListings.blueTeam,
      })
    })

    this.socket.on('start-game', () => {
      this.setState({ live: true })
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
    if (this.state.live) {
      return <GameView room={this.room} socket={this.socket} team={this.team}/>
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
                  {this.state.redTeam.map((player, i) => (
                    <div key={i}>{player}</div>
                  ))}
                </div>

                <div className="no-team">
                  {this.state.neutral.map((player, i) => (
                    <div key={i}>{player}</div>
                  ))}
                </div>
  
                <div className="blue-team">
                  {this.state.blueTeam.map((player, i) => (
                    <div key={i}>{player}</div>
                  ))}
                </div>
              </div>

              <div className="team-button" onClick={() => {
                this.socket.emit(`set-team`, { roomNum: this.room, team: 'red' })
                this.team = 'red';
                }}>
                RED
              </div>
              <div className="team-button" onClick={() => {
                this.socket.emit(`set-team`, { roomNum: this.room, team: null })
                this.team = null;
                }}>
                NONE
              </div>
              <div className="team-button" onClick={() => {
                this.socket.emit(`set-team`, { roomNum: this.room, team: 'blue' })
                this.team = 'blue';
                }}>
                BLUE
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