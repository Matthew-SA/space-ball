import React from "react";
import { Link } from "react-router-dom";
import io from 'socket.io-client';
import NavBarContainer from '../navbar/navbar_container';

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io();
  }


  render() {
    return (
      <div className="mainpage-container">
        <NavBarContainer />
        <div className="lobby-container">
          <center>
            <div className="lobby-content game-lobby">
              <div className="play-container">
                <div className="title link">Create Lobby</div>
              </div>
              <div className="play-container">
                <div className="title">Join Lobby</div>
                <br />
                <input className="input-field" type="text"></input>
                <center>
                  <div className="join-button">Join</div>
                </center>
              </div>
              <div className="play-container">
                <div className="title">How To Play:</div>
                  <div className="instructions">Push the ball towards the oppenent's goal. <br /> 
                    Score by getting the ball into the goal. <br />
                    Move your ship with WASD. <br />
                    First to 10 points wins.  
                  <br />
                </div>
              </div>
              <div className="buy-button" onClick={this.handleClick}>Go Back</div>
              <Link to={{
                pathname: "/lobby",
                room: 1,
                socket: this.socket
              }}><div className="buy-button">Lobby 1</div></Link>
              <Link to={{
                pathname: "/lobby",
                room: 2,
                socket: this.socket
              }}><div className="buy-button">Lobby 1.5</div></Link>
            </div>
          </center>
        </div>
      </div>
    );

  }

};

export default Play;