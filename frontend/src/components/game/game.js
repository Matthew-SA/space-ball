import React from 'react';
// import GameView from "../../classes/game_view";
// import gameLogic from "../../classes/game_logic";
import Game from '../../classes/game/Game'
// import Matter from "matter-js";
// import Util from "./util/util";
// import key from "keymaster";

import io from 'socket.io-client';
import Input from '../../classes/game/Input'

class GameComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: {
        leftScore: 0,
        rightScore: 0,
        over: false,
        winner: null
      }
      // game: null
    }
  }

  componentDidMount() {
    this.socket = io()
    this.canvas = document.getElementById('game-canvas')
    Input.applyEventHandlers();
    this.game = Game.create(this.socket)
    this.game.init()
    this.game.animate();
    // this.game.createSelfShip();
    // this.setState({game: game})
    // this.scoreId = setInterval(() => this.updateScore()
    // , 250)
  };
  
  updateScore() {
    this.setState({ score: this.game.checkScore() });
    // debugger
  }

  componentWillUnmount() {
    clearInterval(this.scoreId);
  }

  render() {
    return (
      <div>
        <div>
          <div className="game">
            <canvas id="game-canvas"></canvas>
          </div>
        </div>
        <ul className="scores">
          <li className="score">Left Score: {this.state.score.leftScore}</li>
          <li className="score">Right Score: {this.state.score.rightScore}</li>
        </ul>
      </div>
    );
  }
};

export default GameComponent;