class Ship {
  constructor() {
    this.shipSprite = new Image();
    this.shipSprite.src = "images/default_ship.png";

    this.shipX = 0;
    this.shipY = 0;
    this.shipLastX = 0;
    this.shipLastY = 0;
  }

  // clear(ctx) {
  //   ctx.clearRect(this.shipLastX, this.shipLastY, 70, 70);
  // }

  // step(data) {
  //   this.shipLastX = this.shipX
  //   this.shipLastY = this.shipY
  //   this.shipX = data.ship.pos.x - 30
  //   this.shipY = data.ship.pos.y - 30
  // }

  // draw2(ctx,x,y) {
  //   ctx.drawImage(
  //     this.shipSprite,
  //     x,
  //     y,
  //   )
  // }

  // draw(ctx) {
  //   ctx.drawImage(
  //     this.shipSprite,
  //     this.shipX,
  //     this.shipY,
  //   )
  // }


  
  // clearAllShips(ctx) {
  //   for (let player of this.allPlayerPos) {
  //     this.ctx.clearRect(player.x - 30, player.y - 30, 70, 70);
  //   }
  // }

  // stepAllShips(data) {
  //   this.allPlayerPosPrev = this.allPlayerPos
  //   this.allPlayerPos = data.ships
  // }

  // drawAllShips(ctx) {
  //   for (let player of this.allPlayerPos) {
  //     ctx.drawImage(
  //       this.shipSprite,
  //       player.x - 30,
  //       player.y - 30,
  //     )
  //   }
  // }
}

export default Ship;