class Booster {
  constructor() {
    this.boosters = new Image();
    this.boosters.src = "images/boosters-red.png";
    this.width = 90;
    this.height = 600;
    this.angle = 45;
    this.shift = 0;

    this.boosterX = 0;
    this.boosterY = 0;
    this.boosterLastX = 0;
    this.boosterLastY = 0;
  }

  clear(ctx) {
    ctx.clearRect(this.boosterLastX, this.boosterLastY, 90, 120);
  }

  step(data) {
    this.boosterLastX = this.boosterX;
    this.boosterLastY = this.boosterY;
    this.boosterX = data.ship.pos.x - 30;
    this.boosterY = data.ship.pos.y - 30;
  }

  // draw2(ctx, x, y) {
  //   ctx.drawImage(this.shipSprite, x, y);
  // }

  draw(ctx, degrees, x, y) {
    console.log(degrees)
    ctx.save();
    ctx.translate(x + 90 / 2, y + 600 / 2);    
    ctx.rotate((degrees * Math.PI) / 180);
    ctx.drawImage(
      this.boosters,
      0,
      0,
      90,
      600,
      -90 / 2,
      -600 / 2,
      90,
      600
    );
    // ctx.rotate((-this.angle * Math.PI) / 180);
    // ctx.translate(-x - this.width / 2, -y - this.height / 2);
    ctx.restore();
    this.animate();
  }

  animate() {
    this.shift += 120;
    if (this.shift >= 600) {
      this.shift = 0;
    }
  }
}

export default Booster;
