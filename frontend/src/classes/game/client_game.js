import Ball from "./entities/ball";
import Ship from "./entities/ship";
import Goals from "./entities/goals"
import ClientArena from "./client_arena"
import ClientCamera from "./client_camera"
import Booster from "./entities/booster";

class ClientGame {
  constructor(socket, room, user, gameoptions) {
    this.socket = socket;
    this.room = room;
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext("2d");
    this.background = document.getElementById('background-canvas');
    this.arenaCtx = this.background.getContext("2d");

    this.gameoptions = {
      ship: gameoptions.ship,
      ball: gameoptions.ball
    }
    this.arena = new ClientArena();
    this.goalPosts = new Goals();

    this.ball = new Ball();
    this.self = new Ship(this.ctx, user, this.gameoptions.ship);
    this.camera = new ClientCamera(0,0, 1600, 900, 3800, 1800)
    this.camera.follow(this.self,800,450)
    this.boosters = new Booster();
    this.shipAngle = 0;
    this.boosterPosX = 0;
    this.boosterPosY = 0;
    
    /// NEW CODE FOR SHIPS - TEMPORARY?
    this.shipSprite = new Image();
    this.shipSprite.src = 'images/default_ship.png';

    this.others = [];
    this.othersPrev = [];
  }

  cycleAll(data) {
    if (!this.winner) {
      this.clearEntities(this.ctx)
      this.stepEntities(data)
      this.camera.update();
      this.drawEntities(this.ctx)
    }
  }

  clearEntities(ctx) {
    this.goalPosts.clear(ctx, this.camera.xView, this.camera.yView)
    this.ball.clear(ctx, this.camera.xView, this.camera.yView)
    this.self.clear(ctx, this.camera.xView, this.camera.yView)
    this.clearOthers(ctx, this.camera.xView, this.camera.yView);
  }

  stepEntities(data) {
    this.ball.step(data)
    this.self.step(data)
    this.stepOthers(data);
  }

  drawEntities(ctx) {
    this.arena.draw(this.arenaCtx, this.camera.xView, this.camera.yView)
    this.ball.draw(ctx, this.camera.xView, this.camera.yView)
    this.self.draw(ctx, this.camera.xView, this.camera.yView)
    this.drawOthers(ctx, this.camera.xView, this.camera.yView);
    this.goalPosts.draw(ctx, this.camera.xView, this.camera.yView)
  }

  clearOthers(ctx, xView, yView) {
    for (let player of this.others) {
      ctx.clearRect(player.pos.x - 100 - xView, player.pos.y - 80 - yView, 200, 200);
    }
  }

  stepOthers(data) {
    this.othersPrev = this.others;
    this.others = data.others;
  }

  drawOthers(ctx, xView, yView) {
    for (let i = 0; i < this.others.length; i++){
      let jetDirection = this.others[i].jetDirection;
      if(jetDirection.x === 0 && jetDirection.y === 0){
        this.boosterPosX = false;
        this.boosterPosY = false;
      }
        else if(jetDirection.x > 0 && jetDirection.y > 0){
        this.shipAngle = 45;
        this.boosterPosX = 95;
        this.boosterPosY = -467;
      } else if(jetDirection.x > 0 && jetDirection.y < 0){
        this.shipAngle = 135;
        this.boosterPosX = 121;
        this.boosterPosY = -163;
      } else if(jetDirection.y < 0 && jetDirection.x < 0){
        this.shipAngle = 225;
        this.boosterPosX = -182;
        this.boosterPosY = -134;
      } else if(jetDirection.y > 0 && jetDirection.x < 0){
        this.shipAngle = 315;
        this.boosterPosX = -212;
        this.boosterPosY = -437;
      } else if(jetDirection.y > 0){
        this.shipAngle = 0;
        this.boosterPosX = -65;
        this.boosterPosY = -515;
      } else if(jetDirection.x > 0) {
        this.shipAngle = 90;
        this.boosterPosX = 169;
        this.boosterPosY = -320;
      } else if(jetDirection.y < 0) {
        this.shipAngle = 180;
        this.boosterPosX = -25;
        this.boosterPosY = -83;
      } else if(jetDirection.x < 0) {
        this.shipAngle = 270;
        this.boosterPosX = -260;
        this.boosterPosY = -280;
      } 

      if(this.boosterPosX || this.boosterPosY){
        this.boosters.draw(
          this.ctx,
          ((this.shipAngle + 180) * Math.PI) / 180,
          this.others[i].pos.x - xView + this.boosterPosX,
          this.others[i].pos.y - yView + this.boosterPosY
        );
      }
      ctx.setTransform(1, 0, 0, 1, this.others[i].pos.x - xView, this.others[i].pos.y - yView);
      ctx.rotate((this.shipAngle * Math.PI) / 180);
      ctx.drawImage(this.shipSprite, -60 / 2, -60 / 2);
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      ctx.fillStyle = "#FFFFFF"
      ctx.font = "16pt Audiowide";
      ctx.fillText(this.user, this.others[i].pos.x - xView, this.others[i].pos.y + 60 - yView);
      ctx.textAlign = "center";
    }
  }
}

export default ClientGame;