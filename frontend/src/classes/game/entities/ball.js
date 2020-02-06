class Ball {
  constructor() {
    this.ballSprite = new Image();
    this.ballSprite.src = 'images/earth_ball.png'

    this.ballX = 0
    this.ballY = 0
    this.ballLastX = 0
    this.ballLastY = 0
  }

  clear(ctx) {
    ctx.clearRect(this.ballLastX, this.ballLastY, 110, 110);
  }


  step(data) {
    this.ballLastX = this.ballX
    this.ballLastY = this.ballY
    this.ballX = data.ball.pos.x - 50
    this.ballY = data.ball.pos.y - 50
  }

  draw(ctx) {
    ctx.drawImage(
      this.ballSprite,
      this.ballX,
      this.ballY,
    )
  }
}

export default Ball;