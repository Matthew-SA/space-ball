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
<<<<<<< HEAD
    this.leftScore = 0;
    this.rightScore = 0;
    this.ball = new Ball;
    this.ship = new Ship;
    this.winner = null;

=======
    // this.leftScore = 0
    // this.rightScore = 0
    // this.isOver();
    this.ball = new Ball();
    this.ship = new Ship();
>>>>>>> 9884ab514334c1711c27b3bd469a1446a9f7a0e8
    this.drawWalls(this.bgctx)
    
    /// NEW CODE FOR SHIPS - TEMPORARY?
    this.shipSprite = new Image();
    this.shipSprite.src = 'images/default_ship.png'
    this.allPlayerPos = [];
    this.allPlayerPosPrev = this.allPlayerPos

  }

  init() {
    this.socket.emit('player-join')
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
    this.drawScore(ctx, data)
  }

  clearAllShips(ctx) {
    for (let player of this.allPlayerPos) {
      this.ctx.clearRect(player.x - 30, player.y - 30, 70, 70);
    }
  }

  stepAllShips(data) {
    this.allPlayerPosPrev = this.allPlayerPos
    this.allPlayerPos = data.ships
  }

  drawAllShips(ctx) {
    for (let player of this.allPlayerPos) {
      this.ship.draw2(
        this.ctx,
        player.x - 30,
        player.y - 30,
      );
    }
  }

  clearEntities(ctx) {
    this.ball.clear(ctx)
    this.clearAllShips();
    ctx.clearRect(700, 0, 600, 100);
  }
  
  stepEntities(data) {
    this.ball.step(data)
    this.stepAllShips(data);
  }
  
  drawEntities(ctx) {
    this.ball.draw(ctx)
    this.drawAllShips();
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

  drawScore(ctx, data) {
    ctx.fillStyle = "#FFFFFF"
    ctx.font = "60px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(data.score.leftScore + "   |   " + data.score.rightScore, 800, 90);
  }
}

module.exports = GameClient;