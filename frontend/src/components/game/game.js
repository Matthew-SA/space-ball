import React from 'react';
// import GameView from "../../classes/game_view";
import GameLogic from "../../js/classes/game_logic";
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
      leftScore: 0,
      rightScore: 0
    }
  }

  componentDidMount() {
    const game = new GameLogic(socket);
    game.playGame(socket);
  };
  
  render() {
    return (
      <div className="game">
        <div>
          <div>
            Right Score: {this.state.rightScore} || Left Score: {this.state.leftScore}
          </div>
          <canvas id="game-canvas"></canvas>
        </div>
      </div>
    );
  }
};

export default GameComponent;