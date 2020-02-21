class ClientHud {
  constructor(socket) {
    this.hud = document.getElementById('hud-canvas');
    this.ctx = this.hud.getContext("2d");

    this.socket = socket;
    this.score = { LEFT: 0, RIGHT: 0 };


    this.socket.on('updateScore', data => {
      this.clearScore(this.ctx)
      this.updateScore(data)
      this.drawScore(this.ctx)
    })

    this.socket.on('gameover', data => {
      this.gameover(this.ctx, data)
    })

    this.drawScore(this.ctx)
  }

  clearScore(ctx) {
    ctx.clearRect(600, 0, 600, 100);
  }

  updateScore(score) {
    this.drawGoal(this.ctx)
    let flashGoal = setInterval(() => this.drawGoal(this.ctx), 200)
    setTimeout(() => clearInterval(flashGoal), 2000)
    this.score = score
    if(this.score.LEFT < 5 && this.score.RIGHT < 5){
      setTimeout(() => {
        this.drawCountdown(this.ctx);
      }, 3000);
    }
  }

  drawScore(ctx) {
    ctx.fillStyle = "#FFFFFF"
    ctx.font = "40pt Audiowide";
    ctx.textAlign = "center";
    ctx.fillText(this.score.LEFT + "   |   " + this.score.RIGHT, 800, 90);
  }

  clearGoal(ctx) {
    ctx.clearRect(600, 600, 400, 300);
  }

  clearCountDown(ctx) {
    ctx.clearRect(300, 400, 900, 300);
  }

  drawGoal(ctx) {
    ctx.fillStyle = "#FFFFFF"
    ctx.font = "80px Faster One";
    ctx.textAlign = "center";
    ctx.fillText("GOAL!!", 800, 800);
    setTimeout(() => this.clearGoal(ctx), 100)
  }

  drawCountdown(ctx){
    ctx.fillStyle = "#FFFFFF"
    ctx.font = "80px Faster One";
    ctx.textAlign = "center";
    ctx.fillText("3", 800, 480);
    setTimeout(() => this.clearCountDown(ctx), 750)

    setTimeout(() => {
      ctx.fillText("2", 800, 480);
    }, 1000);

    setTimeout(() => this.clearCountDown(ctx), 1750)

    setTimeout(() => {
      ctx.fillText("1", 800, 480);
    }, 2000);

    setTimeout(() => this.clearCountDown(ctx), 2750)

    setTimeout(() => {
      ctx.fillText("SPACE BALL!", 800, 480);
    }, 3000);

    setTimeout(() => this.clearCountDown(ctx), 3750)
  }

  gameover(ctx, data) {
    this.winner = data;
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

    document.addEventListener('keydown', e => {
      if (e.keyCode === 13 && this.winner) window.location.href = "/"
    })
  }
}

export default ClientHud;