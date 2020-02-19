class Ball {
  constructor() {
    this.ballSprite = new Image();
    this.ballSprite.src = 'images/earth_ball2.png'

    this.ballX = 0;
    this.ballY = 0;
  }

  clear(ctx, xView, yView) {
    ctx.clearRect(this.ballX - xView, this.ballY - yView, 220, 220);
  }


  step(data) {
    this.ballX = data.ball.x - 100
    this.ballY = data.ball.y - 100
  }

  draw(ctx, xView, yView) {
    ctx.drawImage(
      this.ballSprite,
      this.ballX - xView,
      this.ballY - yView,
    )
  }
}

export default Ball;