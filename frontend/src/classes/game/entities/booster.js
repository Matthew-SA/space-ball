class Booster {
  constructor() {
    this.boosters = new Image();
    this.boosters.src = "images/boosters-red.png";
    this.shift = 0;
    this.cycle = 0;

  }

  draw(ctx, degrees, x, y) {
    // ctx.drawImage(
    //   this.boosters,
    //   0,
    //   this.shift,
    //   90,
    //   120,
    //   x,
    //   y,
    //   90 / 1.8,
    //   120 / 1.8
    // );

    ctx.translate(x + 90 / 2, y + 600 / 2);
    ctx.rotate(degrees);
    ctx.drawImage(this.boosters, 0, this.shift, 90, 120, -90 / 2, -600 / 2, 90/1.7, 120/2.0);
    ctx.rotate(-degrees);
    ctx.translate(-x - 90 / 2, -y - 600 / 2);

    if (this.cycle % 2 === 0 && this.cycle < 600) {
      this.animate();
    }
    if (this.cycle >= 600){
      this.cycle = 0;
    }
  }

  animate() {
    this.shift += 120;
    if (this.shift >= 600 - 120) {
      this.shift = 0;
    }
  }
}

export default Booster;
