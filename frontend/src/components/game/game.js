import React from 'react';
import NavBarContainer from "../nav/navbar_container";
import GameView from "../../classes/game_view";
const Game = require("../../classes/game");

class GameComponent extends React.Component {
  componentDidMount() {
    const canvasEl = document.getElementsByTagName("canvas")[0];
    canvasEl.width = Game.DIM_X;
    canvasEl.height = Game.DIM_Y;

    const ctx = canvasEl.getContext("2d");
    const game = new Game();
    new GameView(game, ctx).start();
  }

  render() {
    return (
      <div className="game">
        
        <NavBarContainer />
        <div>
          <canvas></canvas>
        </div>
      </div>
    );
  }
};

export default GameComponent;