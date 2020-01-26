import React from 'react';
// import GameView from "../../classes/game_view";
import gameLogic from "../../classes/game_logic";
import Matter from "matter-js";
// import Util from "./util/util";
import key from "keymaster";


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