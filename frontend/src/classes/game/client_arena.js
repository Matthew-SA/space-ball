class ClientArena {
  constructor() {
    this.background = document.getElementById('background-canvas');
    this.ctx = this.background.getContext("2d");

    this.foreground = new Image();
    this.foreground.src = 'images/grid.png'

    this.midlayer = new Image();
    this.midlayer.src = 'images/grid2.png'

    this.background = new Image();
    this.background.src = 'images/grid3.png'
  }

  draw(ctx, xView, yView) {
    ctx.drawImage(
      this.background,
      xView / 3, // x axis anchor point
      yView / 3, // y axis anchor point
      1600,
      900,
      0,
      0,
      1600,
      900
    )

    
    ctx.drawImage(
      this.midlayer,
      xView / 2, // x axis anchor point
      yView / 2, // y axis anchor point
      1600,
      900,
      0,
      0,
      1600,
      900
      )
      
    ctx.drawImage(
      this.foreground,
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