import Booster from "./booster";

class Ship {
  constructor(ctx, user, selectedShip) {
    
    this.shipSprite = new Image();
    switch (selectedShip) {
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

    this.ctx = ctx
    this.user = user === "Guest" ? "Guest" : user.username.user

    // this.width = 60;
    // this.height = 60;

    this.pos = { x: 0, y: 0 }

    this.boosters = new Booster("self");
    this.shipAngle = 0;
    this.boosterPosX = 0;
    this.boosterPosY = 0;
    this.jetDirection = { x: 0, y: 0 }
  }

  clear(ctx, xView, yView) {
    ctx.clearRect(this.pos.x - 30 - xView - 60, this.pos.y - 30 - yView - 60, 60 + 120, 60 + 120);
  }

  step(data) {
    this.pos = data.self.pos
    this.jetDirection = data.self.jetDirection
  }

  draw(ctx, xView, yView) {
    if (this.jetDirection.x === 0 && this.jetDirection.y === 0) {
      this.boosterPosX = false;
      this.boosterPosY = false;
    }
    else if (this.jetDirection.x > 0 && this.jetDirection.y > 0) {
      this.shipAngle = 45;
      this.boosterPosX = 95;
      this.boosterPosY = -467;
    } else if (this.jetDirection.x > 0 && this.jetDirection.y < 0) {
      this.shipAngle = 135;
      this.boosterPosX = 121;
      this.boosterPosY = -163;
    } else if (this.jetDirection.y < 0 && this.jetDirection.x < 0) {
      this.shipAngle = 225;
      this.boosterPosX = -182;
      this.boosterPosY = -134;
    } else if (this.jetDirection.y > 0 && this.jetDirection.x < 0) {
      this.shipAngle = 315;
      this.boosterPosX = -212;
      this.boosterPosY = -437;
    } else if (this.jetDirection.y > 0) {
      this.shipAngle = 0;
      this.boosterPosX = -65;
      this.boosterPosY = -515;
    } else if (this.jetDirection.x > 0) {
      this.shipAngle = 90;
      this.boosterPosX = 169;
      this.boosterPosY = -320;
    } else if (this.jetDirection.y < 0) {
      this.shipAngle = 180;
      this.boosterPosX = -25;
      this.boosterPosY = -83;
    } else if (this.jetDirection.x < 0) {
      this.shipAngle = 270;
      this.boosterPosX = -260;
      this.boosterPosY = -280;
    }

    if (this.boosterPosX || this.boosterPosY) {
      this.boosters.draw(
        this.ctx,
        ((this.shipAngle + 180) * Math.PI) / 180,
        (this.pos.x - xView) + this.boosterPosX,
        (this.pos.y - yView) + this.boosterPosY
      );
    }

    ctx.setTransform(1, 0, 0, 1, this.pos.x - xView, this.pos.y - yView);
    ctx.rotate((this.shipAngle * Math.PI) / 180);
    ctx.drawImage(this.shipSprite, -60 / 2, -60 / 2);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    ctx.fillStyle = "#FFFFFF"
    ctx.font = "16pt Audiowide";
    ctx.fillText(this.user, this.pos.x - xView, this.pos.y + 60 - yView);
    ctx.textAlign = "center";
  }
}

export default Ship;