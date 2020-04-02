import Ball from "./entities/ball";
import Ship from "./entities/ship";
import Goals from "./entities/goals"
import ClientHud from './client_hud'
import ClientArena from "./client_arena"
import ClientCamera from "./client_camera"
import Booster from "./entities/booster";
import Input from './Input';
class ClientGame {
  constructor(socket, room, user, team, gameoptions) {
    this.socket = socket;
    this.room = room;
    this.hud = new ClientHud(this.socket);
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext("2d");
    this.background = document.getElementById('background-canvas');
    this.arenaCtx = this.background.getContext("2d");
    this.user = user === "Guest" ? "Guest" : user.username
    this.gameoptions = {
      ship: gameoptions.ship,
      ball: gameoptions.ball
    }
    
    this.arena = new ClientArena();
    this.goalPosts = new Goals();

    this.ball = new Ball();
    this.self = new Ship(this.ctx, this.user, team, this.gameoptions.ship);
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
    Input.applyEventHandlers();
  }

  init() {
    this.socket.on('initialize-others', data => {
      this.clearOthers(this.ctx, this.camera.xView, this.camera.yView);
      this.others = data.others.map(options => new Ship(this.ctx, options.user, options.team, options.ship))
    })
    this.socket.on('gameState', data => {
      this.cycleAll(data)
    });
    this.socket.on('collision', data => {
      this.makeCollisionSound(data);
    });
    this.initializeSounds();
    this.gameLoop();
  }

  gameLoop() {
    setInterval(() => {
      if (!this.cooldown && (Input.LEFT || Input.UP || Input.RIGHT || Input.DOWN)) {
        this.socket.emit('player-action', {
          room: this.room,
          keyboardState: {
            left: Input.LEFT,
            right: Input.RIGHT,
            up: Input.UP,
            down: Input.DOWN
          }
        });
      }
    }, 20);
  }

  cycleAll(data) {
    if (!this.winner) {
      this.clearEntities(this.ctx, this.camera)
      this.stepEntities(data)
      this.camera.update();
      this.drawEntities(this.ctx, this.camera)
    }
  }

  clearEntities(ctx, camera) {
    this.goalPosts.clear(ctx, camera.xView, camera.yView)
    this.ball.clear(ctx, camera.xView, camera.yView)
    this.self.clear(ctx, camera.xView, camera.yView)
    this.clearOthers(ctx, camera.xView, camera.yView);
  }

  stepEntities(data) {
    this.ball.step(data)
    this.self.step(data.self)
    this.stepOthers(data.others);
  }

  drawEntities(ctx, camera) {
    this.arena.draw(this.arenaCtx, camera.xView, camera.yView)
    this.ball.draw(ctx, camera.xView, camera.yView)
    this.self.draw(ctx, camera.xView, camera.yView)
    this.drawOthers(ctx, camera.xView, camera.yView);
    this.goalPosts.draw(ctx, camera.xView, camera.yView)
  }

  clearOthers(ctx, xView, yView) {
    for (let player of this.others) {
      ctx.clearRect(player.pos.x - 100 - xView, player.pos.y - 80 - yView, 200, 200);
    }
  }

  stepOthers(data) {
    for (let i = 0; i < this.others.length; i++) {
      this.others[i].step(data[i])
    }
  }

  drawOthers(ctx, xView, yView) {
    for (let i = 0; i < this.others.length; i++){
      this.others[i].draw(ctx, xView, yView)
    }
  }

  pauseAllSounds() {
    const sounds = document.getElementsByTagName('audio');
    for (let i = 0; i < sounds.length; i++) sounds[i].pause();
  }

  initializeSounds() {
    this.ballBounces = [];

    this.bonk1 = new Audio();
    this.bonk1.src = '/sounds/bonk_1.mp3';
    this.ballBounces.push(this.bonk1);
    this.bonk2 = new Audio();
    this.bonk2.src = '/sounds/bonk_2.mp3';
    this.ballBounces.push(this.bonk2);
    this.bonk3 = new Audio();
    this.bonk3.src = '/sounds/bonk_3.mp3';
    this.ballBounces.push(this.bonk3);
    this.bonk4 = new Audio();
    this.bonk4.src = '/sounds/bonk_4.mp3';
    this.ballBounces.push(this.bonk4);

    this.shipBounce = new Audio();
    this.shipBounce.src = '/sounds/ship_bounce.mp3';
  }

  getRandomBallSound() {
    return this.ballBounces[Math.floor((Math.random() * this.ballBounces.length))];
  }

  makeCollisionSound(data) {
    this.pauseAllSounds();
    const ballSound = this.getRandomBallSound();

    switch (data.type) {
      case 'ship-ball':
        ballSound.load();
        ballSound.play();
        break;
      case 'ship-ship':
        this.shipBounce.load();
        this.shipBounce.play();
        break;
      case 'ship-wall':
        this.shipBounce.load();
        this.shipBounce.play();
        break;
      case 'ball-wall':
        ballSound.load();
        ballSound.play();
        break;
    }
  }
}

export default ClientGame;