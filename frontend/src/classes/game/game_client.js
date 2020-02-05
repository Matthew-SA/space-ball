// import Input from './Input';
// import Util from './Util';
// import Matter from 'matter-js';
const Input = require('./Input');
// const Matter = require('matter-js');
const Ball = require('./entities/ball');
const Ship = require('./entities/ship');

class GameClient {
  constructor(socket){
    this.socket = socket;
    this.canvas = document.getElementById('game-canvas');
    this.background = document.getElementById('background-canvas');
    this.bgctx = this.background.getContext("2d");
    this.ctx = this.canvas.getContext("2d");
    
    this.ball = new Ball;
    this.ship = new Ship;

    // this.ballSprite = new Image();
    // this.ballSprite.src = 'images/earth_ball.png'
    // this.shipSprite = new Image();
    // this.shipSprite.src = 'images/default_ship.png'

    this.drawWalls(this.bgctx)

    this.ballX = 0
    this.ballY = 0
    this.ballLastX = 0
    this.ballLastY = 0

    this.shipX = 0
    this.shipY = 0
    this.shipLastX = 0
    this.shipLastY = 0
  }

  init() {
    this.socket.on('to-client', (data) => {
      this.socket.emit('player-action', {
        keyboardState: {
          left: Input.LEFT,
          right: Input.RIGHT,
          up: Input.UP,
          down: Input.DOWN
        }
      });
      this.cycleAll(this.ctx, data)
    })
  }

  cycleAll(ctx, data) {
    this.clearEntities(ctx)
    this.stepEntities(data)
    this.drawEntities(ctx)
  }

  clearEntities(ctx) {
    this.ball.clear(ctx)
    this.ship.clear(ctx)
  }

  stepEntities(data) {
    this.ball.step(data)
    this.ship.step(data)
  }

  drawEntities(ctx) {
    this.ball.draw(ctx)
    this.ship.draw(ctx)
  }

  drawWalls(ctx) {
    ctx.fillStyle = "#fc03a1";
    ctx.fillRect(0, 0, 1600, 15);
    ctx.fillRect(0, 885, 1600, 15);
    ctx.fillRect(0, 0, 15, 350);
    ctx.fillRect(0, 550, 15, 350);
    ctx.fillRect(1585, 0, 15, 350);
    ctx.fillRect(1585, 550, 15, 350);
  }
}

module.exports = GameClient;