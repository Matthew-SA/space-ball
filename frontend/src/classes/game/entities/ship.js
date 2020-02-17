import Booster from "./booster";

class Ship {
  constructor(ctx, user) {
    this.shipSprite = new Image();
    this.shipSprite.src = "images/default_ship.png";

    this.ctx = ctx
    this.user = user === "Guest" ? user : user.username

    this.pos = { x: 0, y: 0 }
    this.posPrev = { x: 0, y: 0 }

    this.boosters = new Booster();
    this.shipAngle = 0;
    this.boosterPosX = 0;
    this.boosterPosY = 0;
    this.jetDirection = { x: 0, y: 0 }
  }

  clear(ctx) {
    ctx.clearRect(this.pos.x - 100, this.pos.y - 80, 200, 200);
  }


  step(data) {
    this.posPrev = this.pos
    this.pos = data.self.pos
    this.jetDirection = data.self.jetDirection
  }

  draw(ctx) {
    // for (let i = 0; i < this.allPlayerPos.length; i++) {
      // let jetDirection = this.allPlayerPos[i].jetDirection;
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
          this.pos.x + this.boosterPosX,
          this.pos.y + this.boosterPosY
        );
      }

      ctx.setTransform(1, 0, 0, 1, this.pos.x, this.pos.y);
      ctx.rotate((this.shipAngle * Math.PI) / 180);
      ctx.drawImage(this.shipSprite, -60 / 2, -60 / 2);
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      ctx.fillStyle = "#FFFFFF"
      ctx.font = "16pt Audiowide";
      ctx.fillText(this.user, this.pos.x, this.pos.y + 60);
      ctx.textAlign = "center";
    }
}

export default Ship;