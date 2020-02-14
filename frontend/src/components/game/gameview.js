import React from 'react';
// import Input from '../../classes/game/Input'
import GameClient from '../../classes/game/game_client';
// const GameClient = require('../../classes/game/game_client');
// import GameView from "../../classes/game_view";
// import gameLogic from "../../classes/game_logic";
// import Game from '../../classes/game/Game'
// import Matter from "matter-js";
// import Util from "./util/util";
// import key from "keymaster";


class GameView extends React.Component {
  constructor(props) {
    super(props);
    this.socket = this.props.location.socket
    console.log(this.props)
  }

  componentDidMount() {
    // Input.applyEventHandlers();
    // this.socket = io()
    if (!this.socket) {
      window.location.href = "/waitingroom"
    }
    this.canvas = document.getElementById('game-canvas')
    this.gameClient = new GameClient(this.socket, this.props.user)
    this.gameClient.init()
    this.props.fetchInventory();
    // debugger
  };
  
  componentWillUnmount() {
    this.socket.disconnect()
  }

  render() {
    return (
      <div id="game-container">
        <canvas width="1600" height="900" id="background-canvas" data-paper-resize></canvas>
        <canvas width="1600" height="900" id="game-canvas" data-paper-resize></canvas>
      </div>
    );
  }
};

export default GameView;
