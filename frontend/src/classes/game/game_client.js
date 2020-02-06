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
    // this.leftScore = data.leftScore;
    // this.rightScore = data.rightScore;
    // this.isOver();
    this.ball = new Ball();
    this.ship = new Ship();
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
    // this.ship.clear(ctx)
    this.clearAllShips();
  }
  
  stepEntities(data) {
    this.ball.step(data)
    // this.ship.step(data)
    this.stepAllShips(data);
  }
  
  drawEntities(ctx) {
    this.ball.draw(ctx)
    // this.ship.draw(ctx)
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

  // isOver() {
  //   if (this.rightScore === 10) {
  //     this.winner = "right";
  //     return true;
  //   } else if (this.leftScore === 10) {
  //     this.winner = "left";
  //     return true;
  //   }
  //   return false;
  // }

}

module.exports = GameClient;