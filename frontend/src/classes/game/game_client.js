import Ball from "./entities/ball";
import Ship from "./entities/ship";
import Input from './Input';

class GameClient {
  constructor(socket, user) {
    this.socket = socket;
    this.canvas = document.getElementById('game-canvas');
    this.background = document.getElementById('background-canvas');
    this.bgctx = this.background.getContext("2d");
    this.ctx = this.canvas.getContext("2d");
    this.cooldown = false;
    this.winner = null;
    this.ball = new Ball();
    this.ship = new Ship();
    this.score = { LEFT: 0, RIGHT: 0 };
    if (user === "Guest") {
      this.user = user
    } else {
      this.user = user.username;
    }
    this.drawWalls(this.bgctx);

    /// NEW CODE FOR SHIPS - TEMPORARY?
    this.shipSprite = new Image();
    this.shipSprite.src = 'images/default_ship.png';
    this.allPlayerPos = [];
    this.allPlayerPosPrev = this.allPlayerPos;
    Input.applyEventHandlers();
    setInterval(() => {
      if (!this.cooldown && (Input.LEFT || Input.UP || Input.RIGHT || Input.DOWN)) {
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

    document.addEventListener('keydown', e => {
      if (e.keyCode === 13 && this.winner) {
        window.location.href = "/"
      } else {
        return;
      }
    })
  }

  init() {
    // this.socket.removeAllListeners()
    this.socket.emit('player-join')
    this.socket.on('to-client', (data) => {
      this.cycleAll(this.ctx, data)
    });

    this.socket.on('updateScore', data => {
      this.updateScore(data)
      console.log(data)
    })
  }

  cycleAll(ctx, data) {
    if (!this.winner) {
      this.clearEntities(ctx)
      this.stepEntities(data)
      this.drawEntities(ctx)
    }
  }

  clearEntities(ctx) {
    this.ball.clear(ctx)
    this.clearAllShips(ctx);
    ctx.clearRect(600, 0, 600, 100);
  }

  stepEntities(data) {
    this.ball.step(data)
    this.stepAllShips(data);
  }

  drawEntities(ctx) {
    this.ball.draw(ctx)
    this.drawAllShips(ctx);
    this.drawScore(ctx)
  }

  clearAllShips(ctx) {
    for (let player of this.allPlayerPos) {
      ctx.clearRect(player.pos.x - 100, player.pos.y - 30, 200, 200);
    }
  }

  stepAllShips(data) {
    this.allPlayerPosPrev = this.allPlayerPos
    this.allPlayerPos = data.ships
  }

  drawAllShips(ctx) {
    for (let player of this.allPlayerPos) {
      ctx.drawImage(
        this.shipSprite,
        player.pos.x - 30,
        player.pos.y - 30,
      )
      ctx.fillStyle = "#FFFFFF"
      ctx.font = "16pt Audiowide";
      ctx.fillText(this.user, player.pos.x, player.pos.y + 60);
      ctx.textAlign = "center";
    }
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

  updateScore(score) {
    this.drawGoal(this.ctx)
    this.cooldown = true;
    setTimeout(() => this.cooldown = false, 1000)
    let flashGoal = setInterval(() => this.drawGoal(this.ctx), 200)
    setTimeout(() => clearInterval(flashGoal), 1000)
    this.score = score

    if (this.score.LEFT === 10 || this.score.RIGHT === 10) {
      this.winner = this.user;
      setTimeout(() => this.gameOver(this.ctx), 1000)
    }

    if (this.score.RIGHT === 10) {
      this.winner = this.user;
      setTimeout(() => this.gameOver(this.ctx), 1000)
    }
  }

  drawScore(ctx) {
    ctx.fillStyle = "#FFFFFF"
    ctx.font = "40pt Audiowide";
    ctx.textAlign = "center";
    ctx.fillText(this.score.LEFT + "   |   " + this.score.RIGHT, 800, 90);
  }

  drawGoal(ctx) {
    ctx.fillStyle = "#FFFFFF"
    ctx.font = "80px Faster One";
    ctx.textAlign = "center";
    ctx.fillText("GOAL!!", 800, 800);
    setTimeout(() => this.clearGoal(ctx), 100)
  }

  clearGoal(ctx) {
    ctx.clearRect(600, 600, 400, 300);
  }

  gameOver(ctx) {
    this.cooldown = true;
    // this.socket.removeAllListeners()
    ctx.clearRect(0, 0, 1600, 900);
    this.drawScore(ctx)
    ctx.fillStyle = "#FFFFFF"
    ctx.font = "80px Faster One";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", 800, 400);

    ctx.fillStyle = "#FFFFFF"
    ctx.font = "40pt Audiowide";
    ctx.textAlign = "center";
    ctx.fillText(this.winner + " wins!", 800, 500);

    ctx.font = "20pt Audiowide";
    ctx.fillText("press enter to return to lobby", 800, 600);
  }
}

export default GameClient;