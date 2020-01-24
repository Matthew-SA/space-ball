import React from 'react';
import GameView from "../../classes/game_view";
import io from 'socket.io-client';

const Game = require("../../classes/game");
const socket = io();


class GameComponent extends React.Component {
  componentDidMount() {
    const canvasEl = document.getElementsByTagName("canvas")[0];
    canvasEl.width = Game.DIM_X;
    canvasEl.height = Game.DIM_Y;

    const ctx = canvasEl.getContext("2d");
    const game = new Game();
    new GameView(game, ctx).start();

    document.addEventListener('keydown', (e) => {
      console.log('keydown!');
      socket.emit('player-join');
    });
  }


  render() {
    return (
      <div className="game">
        <div>
          <canvas></canvas>
        </div>
      </div>
    );
  }
};

export default GameComponent;