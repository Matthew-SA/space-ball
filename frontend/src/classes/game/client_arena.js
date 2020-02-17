class ClientArena {
  constructor() {
    this.background = document.getElementById('background-canvas');
    this.ctx = this.background.getContext("2d");

    this.texture = new Image();
    this.texture.src = 'images/grid.png'

    this.pos = { x: 0, y: 0 }

    this.drawWalls(this.ctx)
    setTimeout(() => {
      this.draw1()
    }, 200);
  }

  draw(ctx) {
    ctx.drawImage(
      this.texture,
      0, // x axis anchor point
      0, // y axis anchor point
    )
  }

  draw1() {
    this.ctx.drawImage(
      this.texture,
      this.pos.x, // x axis anchor point
      this.pos.y, // y axis anchor point
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