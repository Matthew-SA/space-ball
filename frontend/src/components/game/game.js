import React from 'react';
// import GameView from "../../classes/game_view";
import gameLogic from "../../classes/game_logic";
import Matter from "matter-js";
// import Util from "./util/util";
import key from "keymaster";

//websocket client setup
import io from 'socket.io-client';
const socket = io();

class GameComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: {
        leftScore: 0,
        rightScore: 0,
        over: false
      }
      // game: null
    }
  }

  componentDidMount() {
    this.game = new gameLogic();
    this.game.playGame();
    // this.setState({game: game})
    this.scoreId = setInterval(() => this.updateScore()
    , 250)
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
      <div className="game">
        <div>
          <div></div>
          <canvas id="game-canvas"></canvas>
        </div>
        <ul className="scores">
          <li>Left Score: {this.state.score.leftScore}</li>
          <li>Right Score: {this.state.score.rightScore}</li>
        </ul>
      </div>
    );
  }
};

export default GameComponent;