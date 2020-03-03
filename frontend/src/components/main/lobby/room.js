import React from 'react'
import { Link } from 'react-router-dom';
import NavBarContainer from "../navbar/navbar_container";

class Room extends React.Component {
  constructor(props) {
    super(props)
    this.socket = this.props.location.socket;
    this.room = this.props.location.room;
    this.numPlayers = this.props.location.numPlayers;
// this.state = {
//   team: {
//     red: [],
//     blue: []
//   }
// }
    this.state = {
      redTeam: [],
      blueTeam: []
    }
  }

  componentDidMount() {
    this.socket.emit('enter-room', this.room);

    const {redTeam, blueTeam} = this.state;
    const { username } = this.props.location.user;

    let blueTeamArr = this.state.blueTeam;
    let redTeamArr = this.state.redTeam;

    if(redTeam.length > blueTeam.length){
      blueTeamArr.push(username)
    } else {
      redTeamArr.push(username)
    };

    this.setState({
      redTeam: redTeamArr,
      blueTeam: blueTeamArr
    });
  }

  componentWillUnmount() {
    this.socket.emit('leave-room', this.room);
  }

  render() {
    let red = [];
    let blue = [];
    for(let i=0; i<3; i++){
      red.push(this.state.redTeam[i] ? this.state.redTeam[i] : "[empty]")
    }
    for(let i=0; i<3; i++){
      blue.push(this.state.blueTeam[i] ? this.state.blueTeam[i] : "[empty]")
    }

    if (!this.room) window.location.href = "/play";
    return (
      <div className="mainpage-container">
        <NavBarContainer />
        <div className="lobby-content">
          <div className="box">
            <svg style={{ width: "24px", height: "24px" }} viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"
              />
            </svg>
            <div className="room-welcome-header">
              Welcome to Room #00{this.room}
            </div>

            <div className="room-column-headers">
              <div>RED</div>
              <div>BLUE</div>
            </div>

            <div className="teams">
              <div className="red-team">
                {red.map((player, i) => (
                  <div>{player}</div>
                ))}
              </div>

              <div className="blue-team">
                {blue.map((player, i) => (
                  <div>{player}</div>
                ))}
              </div>
            </div>

            <Link
              to={{
                pathname: "/game",
                room: this.room,
                socket: this.socket
              }}
            >
              <div className="play">Start Game</div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Room;