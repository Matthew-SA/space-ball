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
    // this.sprite = new Image();
    // this.sprite.src = '../../../public/images/earth_ball.png'
    this.socket.on('to-client', (data) => {
      console.log(data);
      this.ballX = data.ball.pos.x - 50;
      this.ballY = data.ball.pos.y - 50;
      this.ballLastX = data.ball.lastPos.x - 55;
      this.ballLastY = data.ball.lastPos.y - 55;
      this.shipX = data.ship.pos.x - 30;
      this.shipY = data.ship.pos.y - 30;
      this.shipLastX = data.ship.lastPos.x - 35;
      this.shipLastY = data.ship.lastPos.y - 35;
      this.drawBall(this.ctx, this.ballX, this.ballY);
      this.drawShip(this.ctx, this.shipX, this.shipY);
      this.leftScore = data.leftScore;
      this.rightScore = data.rightScore;
      this.isOver();
    })
    this.drawWalls(this.bgctx)
    // this.drawBall(this.ctx);
    this.ballSprite = new Image();
    this.ballSprite.src = 'images/earth_ball.png'
    this.shipSprite = new Image();
    this.shipSprite.src = 'images/default_ship.png'
    // this.sprite.onload = () => {
    //   this.drawBall(this.ctx)
      // this.ctx.drawImage(this.sprite, 0, 0);
    // };
  }

  isOver() {
    if (this.rightScore === 10) {
      this.winner = "right";
      return true;
    } else if (this.leftScore === 10) {
      this.winner = "left";
      return true;
    }
    return false;
  }

  init() {
    setInterval(() => {
      this.socket.emit('player-action', {
        keyboardState: {
          left: Input.LEFT,
          right: Input.RIGHT,
          up: Input.UP,
          down: Input.DOWN
        }
      });
    }, 20);
  }

  drawBall(ctx, x, y) {
    ctx.clearRect(this.ballLastX, this.ballLastY, 110, 110);
    ctx.drawImage(
      this.ballSprite,
      x,
      y,
    )
  }

  drawShip(ctx, x, y) {
    ctx.clearRect(this.shipLastX, this.shipLastY, 70, 70);
    ctx.drawImage(
      this.shipSprite,
      x,
      y,
    )
  }

  drawWalls(ctx) {
    ctx.fillStyle = "#fc03a1";
    ctx.fillRect(0, 0, 1000, 15);
    ctx.fillRect(0, 585, 1000, 15);
    ctx.fillRect(0, 0, 15, 175);
    ctx.fillRect(0, 425, 15, 175);
    ctx.fillRect(985, 0, 15, 175);
    ctx.fillRect(985, 425, 15, 175);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "6";
    ctx.strokeStyle = "red";
    ctx.rect(5, 5, 290, 140);
    ctx.stroke();
  }
}

module.exports = GameClient;