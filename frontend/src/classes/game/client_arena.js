class ClientArena {
  constructor() {
    this.background = document.getElementById('background-canvas');
    this.ctx = this.background.getContext("2d");

    this.image = new Image();
    this.image.src = 'images/grid.png'

    this.pos = { x: 0, y: 0 }

    setTimeout(() => {
      this.drawWalls(this.ctx)
    }, 200);
  }

  draw(ctx) {
    ctx.drawImage(
      this.texture,
      0, // x axis anchor point
      0, // y axis anchor point
    )
  }

  newDraw(xView, yView) {
    this.ctx.drawImage(
      this.image,
      xView, // x axis anchor point
      yView, // y axis anchor point
      1600,
      900,
      0,
      0,
      1600,
      900
    )
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
}

export default ClientArena;