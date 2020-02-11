import Ball from "./entities/ball";
import Ship from "./entities/ship";
import Input from './Input';
import Booster from "./entities/booster";
// import Util from './Util';
// import Matter from 'matter-js';
// const Input = require('./Input');
// const Ball = require('./entities/ball');
// const Ship = require('./entities/ship');

class GameClient {
  constructor(socket){
    this.socket = socket;
    this.canvas = document.getElementById('game-canvas');
    this.background = document.getElementById('background-canvas');
    this.bgctx = this.background.getContext("2d");
    this.ctx = this.canvas.getContext("2d");
    // this.isOver();
    this.ball = new Ball();
    this.ship = new Ship();
    this.boosters = new Booster();
    this.degrees = 0;
    this.drawWalls(this.bgctx)
    
    /// NEW CODE FOR SHIPS - TEMPORARY?
    this.shipSprite = new Image();
    this.shipSprite.src = 'images/default_ship.png'
    this.allPlayerPos = [];
    this.allPlayerPosPrev = this.allPlayerPos
    this.allBoosterPos = [];
    this.allBoosterPosPrev = this.allBoosterPos
    Input.applyEventHandlers();
    setInterval(() => {
      if (Input.LEFT || Input.UP || Input.RIGHT || Input.DOWN) {
        this.socket.emit('player-action', {
          keyboardState: {
            left: Input.LEFT,
            right: Input.RIGHT,
            up: Input.UP,
            down: Input.DOWN
          }
        });
     }
    }, 20);
  }
  
  init() {
    // this.socket.removeAllListeners()
    this.socket.emit('player-join')
    this.socket.on('to-client', data => { 
      this.cycleAll(this.ctx, data)
    });

    this.socket.on('updateScore', data => {
      this.updateScore(data)
      console.log(data)
    })
  }

  cycleAll(ctx, data) {
    this.clearEntities(ctx)
    this.stepEntities(data)
    
    this.drawEntities(ctx)
    this.drawScore(ctx, data)
  }
  
  clearEntities(ctx) {
    this.ball.clear(ctx)
    this.clearAllShips(ctx);
    this.clearAllBoosters(ctx);
    ctx.clearRect(700, 0, 600, 100);
  }
  
  stepEntities(data) {
    this.ball.step(data)
    this.stepAllShips(data);
    this.stepAllBoosters(data);
  }
  
  drawEntities(ctx) {
    this.ball.draw(ctx)
    this.drawBoosters(ctx);
    this.drawAllShips(ctx);
  }

  clearAllShips(ctx) {
    for (let player of this.allPlayerPos) {
      ctx.clearRect(player.x - 30, player.y - 30, 70, 70);
    }
  }

  clearAllBoosters(ctx) {
    for (let player of this.allBoosterPos) {
      this.ctx.clearRect(player.x - 100, player.y - 100, 250, 280);
    }
  }

  stepAllShips(data) {
    this.allPlayerPosPrev = this.allPlayerPos
    this.allPlayerPos = data.ships.positions
  }

  stepAllBoosters(data) {
    this.allBoosterPosPrev = this.allBoosterPos
    this.allBoosterPos = data.ships.positions
  }

  drawAllShips(ctx) {
    for (let player of this.allPlayerPos) {
      ctx.drawImage(
        this.shipSprite,
        player.x - 30,
        player.y - 30,
      )
    }
  }

  drawBoosters(ctx){
    for (let player of this.allPlayerPos){
      this.boosters.draw(
        this.ctx,
        (this.degrees % 360),
        player.x - 30,
        player.y - 30
      )
    };
    this.degrees += 2;
  };

  drawWalls(ctx) {
    ctx.fillStyle = "#fc03a1";
    ctx.fillRect(0, 0, 1600, 15);
    ctx.fillRect(0, 885, 1600, 15);
    ctx.fillRect(0, 0, 15, 350);
    ctx.fillRect(0, 550, 15, 350);
    ctx.fillRect(1585, 0, 15, 350);
    ctx.fillRect(1585, 550, 15, 350);
  }

  updateScore(score) {
    this.drawGoal(this.ctx)
    let flashGoal = setInterval(() => this.drawGoal(this.ctx), 200)
    setTimeout(() => clearInterval(flashGoal), 1000)
    this.score = score

    if (this.score.LEFT === 10) {
      // game over
      this.winner = "left";
    }

    if (this.score.RIGHT === 10) {
      // game over
      this.winner = "left";
    }
  }

  drawScore(ctx, data) {
    ctx.fillStyle = "#FFFFFF"
    ctx.font = "40pt Audiowide";
    ctx.textAlign = "center";
    ctx.fillText(data.score.leftScore + "   |   " + data.score.rightScore, 800, 90);
  }

  drawGoal(ctx) {
    console.log("drawing goal?")
    ctx.save();
    ctx.fillStyle = "#FFFFFF"
    ctx.font = "80px Faster One";
    ctx.textAlign = "center";
    ctx.fillText("GOAL!!", 800, 800);
    ctx.restore();
    setTimeout(() => this.clearGoal(ctx), 100)
  }

  clearGoal(ctx) {
    ctx.clearRect(600, 600, 400, 300);
  }
}

export default GameClient;