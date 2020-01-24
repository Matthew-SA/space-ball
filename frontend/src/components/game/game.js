import React from 'react';
// import GameView from "../../classes/game_view";
import gameLogic from "../../classes/game_logic";
import Matter from "matter-js";
// import Util from "./util/util";
import key from "keymaster";


class GameComponent extends React.Component {
  constructor(props) {
    super(props);

    this.rightScore = 0;
    this.leftScore = 0;
  }


  componentDidMount() {
    const game = new gameLogic();
    game.playGame();
  };
  
  render() {
    return (
      <div className="game">
        <div>
          <div>
            Right Score: {this.rightScore} || Left Score: {this.leftScore}
          </div>
          <canvas id="game-canvas"></canvas>
        </div>
      </div>
    );
  }
};

export default GameComponent;