const HashMap = require('hashmap')
const Matter = require("matter-js");
const ServerEngine = require('./server_engine')
const ServerPlayer = require('./server_player')

class ServerGame extends ServerEngine {
  constructor(io, room) {
    super()
    this.io = io
    this.room = room
    this.roster = new HashMap();
    this.ids = []
    this.players = []
    this.score = { LEFT: 0, RIGHT: 0 }
    this.timeout = 0;
    this.init();
  }

  init() {
    /// server-side game loop ///
    setInterval(() => {
      if (this.timeout > 0) this.timeout--
      Matter.Engine.update(this.engine, 20);
      this.sendGameState();
    }, 20);



    // Check if ball has passed through goal sensor
    Matter.Events.on(this.engine, "collisionEnd", (event) => {
      const pairs = event.pairs;

      for (let i = 0, j = pairs.length; i !== j; ++i) {
        let pair = pairs[i];

        if (pair.bodyA === this.leftSensor || pair.bodyB === this.leftSensor) {
          this.score.RIGHT += 1;
          this.timeout = 65;
          this.io.in('room-' + this.room).emit('updateScore', this.score)
          this.reset();
        } else if (pair.bodyA === this.rightSensor || pair.bodyB === this.rightSensor) {
          this.score.LEFT += 1;
          this.timeout = 65;
          this.io.in('room-' + this.room).emit('updateScore', this.score)
          this.reset();
        }

        if (this.score.LEFT === 10) {
          this.timeout =
            this.io.in('room-' + this.room).emit('gameover', "LEFT")
        } else if (this.score.RIGHT === 10) {
          this.timeout = 10000;
          this.io.in('room-' + this.room).emit('gameover', "RIGHT")
        }
      }
    });
  }


  addNewPlayer(socket) {
    this.roster.set(socket.id, new ServerPlayer(socket.id, this.world));
    this.ids = this.roster.keys();
    this.players = this.roster.values();
    // this.reset();
  }

  removePlayer(id) {
    let player = this.roster.get(id)
    this.roster.remove(id);
    this.ids = this.roster.keys();
    this.players = this.roster.values();
    Matter.World.remove(this.world, player.ship)
  }

  movePlayer(id, data) {
    if (this.timeout) return;
    let player = this.roster.get(id);
    if (player) player.move(data.keyboardState);
  }

  sendGameState() {
    for (var i = 0; i < this.ids.length; i++) {
      this.io.to(this.ids[i]).emit('gameState', {
        self: this.getSelfInfo(this.players[i]),
        others: this.getOthersInfo(this.ids[i], this.players),
        ball: this.ball.position,
      })
    }
  }

  getSelfInfo(player) {
    return {
      pos: player.ship.position,
      jetDirection: Object.assign({}, player.jetDirection)
    }
  }

  getOthersInfo(selfId, players) {
    let others = players.filter((player) => player.id != selfId)
    return others.map(player => this.getSelfInfo(player))
  }

  reset() {
    const players = this.roster.values();
    for (let i = 0; i < players.length; i++) {
      if (i === 0) {
        Matter.Body.setPosition(players[i].ship, { x: 450, y: 450 });
        Matter.Body.setVelocity(players[i].ship, { x: 0, y: 0 });
      }
      if (i === 1) {
        Matter.Body.setPosition(players[i].ship, { x: 1150, y: 450 });
        Matter.Body.setVelocity(players[i].ship, { x: 0, y: 0 });
      }
    }
    Matter.Body.setPosition(this.ball, { x: 800, y: 450 });
    Matter.Body.setVelocity(this.ball, { x: 0, y: 0 });
    Matter.Body.setAngularVelocity(this.ball, 0);
  }
};

module.exports = ServerGame;