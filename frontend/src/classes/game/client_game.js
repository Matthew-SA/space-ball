import Ball from "./entities/ball";
import Ship from "./entities/ship";
import Input from './Input';
import Booster from "./entities/booster";

class ClientGame {
  constructor(socket, room, user) {
    this.socket = socket;
    this.room = room;
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext("2d");

    this.ball = new Ball();
    this.self = new Ship(this.ctx, user);
    this.boosters = new Booster();
    this.shipAngle = 0;
    this.boosterPosX = 0;
    this.boosterPosY = 0;
    

    /// NEW CODE FOR SHIPS - TEMPORARY?
    this.shipSprite = new Image();
    this.shipSprite.src = 'images/default_ship.png';

    this.allPlayerPos = [];
    this.allPlayerPosPrev = this.allPlayerPos
    this.allPlayerInput = [];
    this.allPlayerInputPrev = this.allPlayerInput
    this.allBoosterPos = [];
    this.allBoosterPosPrev = this.allBoosterPos

    document.addEventListener('keydown', e => {
      if (e.keyCode === 13 && this.winner) window.location.href = "/"
    })
  }

  cycleAll(ctx, data) {
    if (!this.winner) {
      this.clearEntities(ctx)
      this.stepEntities(data)
      this.drawEntities(ctx)
    }
  }

  clearEntities(ctx) {
    this.ball.clear(ctx)
    this.self.clear(ctx)
    // this.clearAllShips(ctx);
    ctx.clearRect(600, 0, 600, 100);
  }

  stepEntities(data) {
    this.ball.step(data)
    this.self.step(data)
    // this.stepAllShips(data);
  }

  drawEntities(ctx) {
    this.ball.draw(ctx);
    this.self.draw(ctx)
    // this.drawAllShips(ctx);
  }

  // clearAllShips(ctx) {
  //   for (let player of this.allPlayerPos) {
  //     ctx.clearRect(player.pos.x - 100, player.pos.y - 30, 200, 200);
  //   }
  // }

  // clearAllBoosters(ctx) {
  //   for (let player of this.allBoosterPos) {
  //     this.ctx.clearRect(player.pos.x - 100, player.pos.y - 100, 250, 280);
  //   }
  // }

  // stepAllShips(data) {
  //   this.allPlayerPosPrev = this.allPlayerPos
  //   this.allPlayerPos = [data.self]
  // }

  // stepAllBoosters(data) {
  //   this.allBoosterPosPrev = this.allBoosterPos
  //   this.allBoosterPos = data.ships
  // }

  // drawAllShips(ctx) {
  //   for (let i = 0; i < this.allPlayerPos.length; i++){
  //       let jetDirection = this.allPlayerPos[i].jetDirection;
  //       if(jetDirection.x === 0 && jetDirection.y === 0){
  //         this.boosterPosX = false;
  //         this.boosterPosY = false;
  //       }
  //         else if(jetDirection.x > 0 && jetDirection.y > 0){
  //         this.shipAngle = 45;
  //         this.boosterPosX = 95;
  //         this.boosterPosY = -467;
  //       } else if(jetDirection.x > 0 && jetDirection.y < 0){
  //         this.shipAngle = 135;
  //         this.boosterPosX = 121;
  //         this.boosterPosY = -163;
  //       } else if(jetDirection.y < 0 && jetDirection.x < 0){
  //         this.shipAngle = 225;
  //         this.boosterPosX = -182;
  //         this.boosterPosY = -134;
  //       } else if(jetDirection.y > 0 && jetDirection.x < 0){
  //         this.shipAngle = 315;
  //         this.boosterPosX = -212;
  //         this.boosterPosY = -437;
  //       } else if(jetDirection.y > 0){
  //         this.shipAngle = 0;
  //         this.boosterPosX = -65;
  //         this.boosterPosY = -515;
  //       } else if(jetDirection.x > 0) {
  //         this.shipAngle = 90;
  //         this.boosterPosX = 169;
  //         this.boosterPosY = -320;
  //       } else if(jetDirection.y < 0) {
  //         this.shipAngle = 180;
  //         this.boosterPosX = -25;
  //         this.boosterPosY = -83;
  //       } else if(jetDirection.x < 0) {
  //         this.shipAngle = 270;
  //         this.boosterPosX = -260;
  //         this.boosterPosY = -280;
  //       } 

  //       if(this.boosterPosX || this.boosterPosY){
  //         this.boosters.draw(
  //           this.ctx,
  //           ((this.shipAngle + 180) * Math.PI) / 180,
  //           this.allPlayerPos[i].pos.x + this.boosterPosX,
  //           this.allPlayerPos[i].pos.y + this.boosterPosY
  //         );
  //       }
  //       // ctx.drawImage(this.texture, 0, 0)
  //       ctx.setTransform(1, 0, 0, 1, this.allPlayerPos[i].pos.x, this.allPlayerPos[i].pos.y);
  //       ctx.rotate((this.shipAngle * Math.PI) / 180);
  //       ctx.drawImage(this.shipSprite, -60 / 2, -60 / 2);
  //       ctx.setTransform(1, 0, 0, 1, 0, 0);

  //       ctx.fillStyle = "#FFFFFF"
  //       ctx.font = "16pt Audiowide";
  //       ctx.fillText(this.user, this.allPlayerPos[i].pos.x, this.allPlayerPos[i].pos.y + 60);
  //       ctx.textAlign = "center";
  //     }
  // }
}

export default ClientGame;