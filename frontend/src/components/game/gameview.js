import React from 'react';
// import GameClient from '../../classes/game/client_game';
import ClientViewPort from '../../classes/game/client_viewport'



class GameView extends React.Component {
  constructor(props) {
    super(props);
    this.socket = this.props.location.socket
    this.room = this.props.location.room
  }

  componentDidMount() {
    if (!this.socket) {
      window.location.href = "/waitingroom"
    }
    // this.canvas = document.getElementById('game-canvas')
    this.clientViewPort = new ClientViewPort(this.socket, this.room, this.props.user)
    this.clientViewPort.init()
  };
  
  componentWillUnmount() {
    this.socket.disconnect()
  }

  render() {
    return (
      <div id="game-container">
        <canvas width="1600" height="900" id="hud-canvas"></canvas>
        <canvas width="1600" height="900" id="game-canvas"></canvas>
        <canvas width="1600" height="900" id="background-canvas"></canvas>
      </div>
    );
  }
};

export default GameView;
