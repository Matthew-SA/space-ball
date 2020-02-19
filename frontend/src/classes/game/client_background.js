class ClientBackground {
  constructor() {
    this.background = document.getElementById('background-canvas');
    this.ctx = this.background.getContext("2d");

    this.image = new Image();
    this.image.src = 'images/grid2.png'
  }

  draw(ctx, xView, yView) {
    ctx.drawImage(
      this.image,
      xView / 2, // x axis anchor point
      yView / 2, // y axis anchor point
      1600,
      900,
      0,
      0,
      1600,
      900
    )
  }
}

export default ClientBackground;