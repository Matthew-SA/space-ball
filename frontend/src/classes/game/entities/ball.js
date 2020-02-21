class Ball {
  constructor() {
    this.ballSprite = new Image();
    this.ballSprite.src = 'images/earth_ball2.png'

    this.ballX = 0;
    this.ballY = 0;
    this.ballAngle = 0;
  }

  clear(ctx, xView, yView) {
    ctx.clearRect(this.ballX - xView - 4, this.ballY - yView - 4, 220 + 8, 220 + 8);
  }


  step(data) {
    this.ballX = data.ball.x - 100
    this.ballY = data.ball.y - 100
    this.ballAngle = data.ball.angle
  }

  draw(ctx, xView, yView) {
    // ctx.drawImage(
    //   this.ballSprite,
    //   this.ballX - xView,
    //   this.ballY - yView,
    // )

    ctx.setTransform(1, 0, 0, 1, this.ballX - xView + 100, this.ballY - yView + 100);
    ctx.rotate((this.ballAngle * Math.PI * 15) / 180);
    ctx.drawImage(this.ballSprite, -200 / 2, -200 / 2);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}

export default Ball;