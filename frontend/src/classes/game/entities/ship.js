class Ship {
  constructor(selectedShip) {
    this.shipSprite = new Image();
    switch(selectedShip) {
      case ("Default"):
        this.shipSprite.src = "images/default_ship.png";
        break;
      case ("Red"):
        this.shipSprite.src = "images/red_ship.png";
        break;
      case ("Green"):
        this.shipSprite.src = "images/green_ship.png";
        break;
      case ("Blue"):
        this.shipSprite.src = "images/blue_ship.png";
        break;
      default:
        this.shipSprite.src = "images/default_ship.png";
    }
    this.shipX = 0;
    this.shipY = 0;
    this.shipLastX = 0;
    this.shipLastY = 0;
  }
}

export default Ship;