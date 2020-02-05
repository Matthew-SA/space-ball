// import Input from './Input';
// import Util from './Util';
// import Matter from 'matter-js';
const Input = require('./Input');
const Matter = require('matter-js');

class GameClient {
  constructor(socket){
    this.socket = socket;
    this.canvas = document.getElementById('game-canvas');
    this.background = document.getElementById('background-canvas');
    this.bgctx = this.background.getContext("2d");
    this.ctx = this.canvas.getContext("2d");
    
    this.ballSprite = new Image();
    this.ballSprite.src = 'images/earth_ball.png'
    this.shipSprite = new Image();
    this.shipSprite.src = 'images/default_ship.png'

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
      this.clearBall(this.ctx)
      this.clearship(this.ctx)
      this.stepBall(data)
      this.stepShip(data)
      this.drawBall(this.ctx)
      this.drawShip(this.ctx)
    })
  }


  clearBall(ctx) {
    ctx.clearRect(this.ballLastX, this.ballLastY, 110, 110); 
  }

  stepBall(data) {
    this.ballLastX = this.ballX
    this.ballLastY = this.ballY
    this.ballX = data.ball.pos.x - 50
    this.ballY = data.ball.pos.y - 50
  }

  drawBall(ctx) {
    ctx.drawImage(
      this.ballSprite,
      this.ballX,
      this.ballY,
    )
  }

  clearship(ctx) {
    ctx.clearRect(this.shipLastX, this.shipLastY, 70, 70);
  }

  stepShip(data) {
    this.shipLastX = this.shipX
    this.shipLastY = this.shipY
    this.shipX = data.ship.pos.x - 30
    this.shipY = data.ship.pos.y - 30
  }

  drawShip(ctx) {
    ctx.drawImage(
      this.shipSprite,
      this.shipX,
      this.shipY,
    )
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