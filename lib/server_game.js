const Matter = require("matter-js");
const ServerEngine = require('./server_engine')
const ServerPlayer = require('./server_player')

class ServerGame extends ServerEngine {
  constructor(io, room, rosterList) {
    super()
    this.io = io
    this.room = room
    this.roster = new Map()
    // this.maxPlayers = 6;
    this.score = { LEFT: 0, RIGHT: 0 }
    this.timeout = 0;
    this.createRoster(rosterList);
    this.init();
  }

  init() {
    /// server-side game loop ///
    setInterval(() => {
      if (this.timeout > 0) this.timeout--
      Matter.Engine.update(this.engine, 20);
      this.sendGameState();
    }, 20);

    this.activateScoreLogic();
  }

  createRoster(rosterList) {
    for (let id of rosterList.keys()) {
      let info = rosterList.get(id)
      this.roster.set(id, new ServerPlayer(id, info.user, info.team, this.world))
    }
  }

  addPlayer(id, username, gameOptions) {
    this.roster.set(id, new ServerPlayer(id, username, gameOptions, this.world));
  }

  removePlayer(id) {
    let player = this.roster.get(id)
    if (!player) return;
    this.roster.delete(id);
    Matter.Composite.remove(this.world, player.ship)
  }

  movePlayer(id, data) {
    if (this.timeout) return;
    let player = this.roster.get(id);
    if (player) player.move(data.keyboardState);
  }

  sendGameState() {
    let players = [...this.roster.values()]
    for (let id of this.roster.keys()) {
      let player = this.roster.get(id)
      this.io.to(id).emit('gameState', {
        self: this.getSelfInfo(player),
        others: this.getOthersInfo(player, players),
        ball: {
          x: Math.floor(this.ball.position.x),
          y: Math.floor(this.ball.position.y),
          angle: this.ball.angle.toFixed(1)
        }
      })
    }
  }

  getSelfInfo(player) {
    let result = {
      pos: {
        x: Math.floor(player.ship.position.x), y: Math.floor(player.ship.position.y) 
      },
      jetDirection: Object.assign({}, player.jetDirection)
    }
    player.resetJetDirection();
    return result;
  }

  getOthersInfo(selfId, players) {
    let others = players.filter((player) => player.id != selfId)
    return others.map(player => this.getSelfInfo(player))
  }



  
  activateScoreLogic() {
    // Check if ball has passed through goal sensor
    Matter.Events.on(this.engine, "collisionStart", (event) => {
      const pairs = event.pairs;

      for (let i = 0, j = pairs.length; i !== j; ++i) {
        let pair = pairs[i];

        if (pair.bodyA === this.leftSensor || pair.bodyB === this.leftSensor) {
          this.score.RIGHT += 1;
          Matter.Body.setVelocity(this.ball, { x: 0, y: 0 });
          Matter.Body.setAngularVelocity(this.ball, 0);

          for (let id of this.roster.keys()) {
            let player = this.roster.get(id)
            if (player.ship.position.x < 900) {
              Matter.Body.setVelocity(player.ship, { x: 80, y: -(this.ball.position.y - player.ship.position.y) / 6 });
            }
          }
          Matter.Body.setPosition(this.ball, { x: -9999, y: 900 })

          this.io.in('room-' + this.room).emit('updateScore', this.score)
          if (this.score.LEFT < 5 && this.score.RIGHT < 5) {
            setTimeout(() => {
              this.timeout = 150;
              this.reset();
            }, 3000);
          }

        } else if (pair.bodyA === this.rightSensor || pair.bodyB === this.rightSensor) {
          this.score.LEFT += 1;
          Matter.Body.setVelocity(this.ball, { x: 0, y: 0 });
          Matter.Body.setAngularVelocity(this.ball, 0);

          for (let id of this.roster.keys()) {
            let player = this.roster.get(id)
            if (player.ship.position.x > 2900) {
              Matter.Body.setVelocity(player.ship, { x: -80, y: -(this.ball.position.y - player.ship.position.y) / 6 });
            }
          }
          Matter.Body.setPosition(this.ball, { x: -9999, y: 900 })

          this.io.in('room-' + this.room).emit('updateScore', this.score)

          if (this.score.LEFT < 5 && this.score.RIGHT < 5) {
            setTimeout(() => {
              this.timeout = 150;
              this.reset();
            }, 3000);
          }
        }

        if (this.score.LEFT === 5) {
          // this.timeout = 10000;
          this.io.in('room-' + this.room).emit('gameover', "LEFT");
        } else if (this.score.RIGHT === 5) {
          // this.timeout = 10000;
          this.io.in('room-' + this.room).emit('gameover', "RIGHT");
        }
      }
    });
  }

  reset() {
    let players = [...this.roster.values()]
    for (let i = 0; i < players.length; i++) {
      if (i === 0) {
        Matter.Body.setVelocity(players[i].ship, { x: 0, y: 0 });
        Matter.Body.setPosition(players[i].ship, { x: 450, y: 900 });
      }
      if (i === 1) {
        Matter.Body.setVelocity(players[i].ship, { x: 0, y: 0 });
        Matter.Body.setPosition(players[i].ship, { x: 1150, y: 900 });
      }
    }
    Matter.Body.setPosition(this.ball, { x: 1900, y: 900 });
    Matter.Body.setVelocity(this.ball, { x: 0, y: 0 });
    Matter.Body.setAngularVelocity(this.ball, 0);
    Matter.Body.setAngle(this.ball, 0);
  }
};

module.exports = ServerGame;