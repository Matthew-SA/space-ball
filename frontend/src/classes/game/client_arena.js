class ClientArena {
  constructor() {
    this.background = document.getElementById('background-canvas');
    this.ctx = this.background.getContext("2d");

    this.image = new Image();
    this.image.src = 'images/grid.png'

    this.pos = { x: 0, y: 0 }
  }

  draw(ctx, xView, yView) {
    ctx.drawImage(
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
}

export default ClientArena;