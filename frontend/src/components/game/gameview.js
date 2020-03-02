import React from 'react';
import ClientViewPort from '../../classes/game/client_viewport'


class GameView extends React.Component {
  constructor(props) {
    super(props);
    this.socket = this.props.location.socket
    this.room = this.props.location.room
  }

  componentDidMount() {
    this.socket.emit('enter-room', this.room)
    if (!this.socket) window.location.href = "/play";
    this.clientViewPort = new ClientViewPort(this.socket, this.room, this.props.user, this.props.gameoptions);
    this.clientViewPort.init();
  };
  
  componentWillUnmount() {
    this.socket.emit('leave-game', this.room)
    this.socket.disconnect();
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
