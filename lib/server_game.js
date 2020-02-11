const HashMap = require('hashmap')
const Matter = require("matter-js");
const ServerEngine = require('./server_engine')
const ServerPlayer = require('./server_player')

class ServerGame {
  constructor(io) {
    this.io = io
    // this.clients = new HashMap();
    this.players = new HashMap();
    this.serverEngine = new ServerEngine;
    this.engine = this.serverEngine.engine
    this.world = this.serverEngine.world;
    this.ball = this.serverEngine.ball;
    this.score = {LEFT: 0, RIGHT: 0}


    /// server-side game loop ///
    setInterval(() => {
      Matter.Engine.update(this.engine, 20);
      this.io.emit("to-client", {
        ball: {
          pos: this.ball.position
        },
        ships: {
          positions: this.getAllPos(),
          forces: this.getAllForce()
        },
        score: {
          leftScore: this.serverEngine.leftScore,
          rightScore: this.serverEngine.rightScore
        }
      });
    }, 20);

    // Check if ball has passed through goal sensor

    Matter.Events.on(this.engine, "collisionEnd", (event) => {
      const pairs = event.pairs;

      for (let i = 0, j = pairs.length; i !== j; ++i) {
        let pair = pairs[i];

        if (pair.bodyA === this.serverEngine.leftSensor || pair.bodyB === this.serverEngine.leftSensor) {
          this.score.LEFT += 1;
          this.io.emit('updateScore', this.score)
          this.serverEngine.reset();
        } else if (pair.bodyA === this.serverEngine.rightSensor || pair.bodyB === this.serverEngine.rightSensor) {
          this.score.RIGHT += 1;
          this.io.emit('updateScore', this.score)
          this.serverEngine.reset();
        }
      }
    });
  }

  addNewPlayer(socket) {
    // this.clients.set(socket.id, socket);
    this.players.set(socket.id, new ServerPlayer(socket.id, this.world));
  }

  removePlayer(id) {
    let player = this.players.get(id)
    // this.clients.remove(id);
    this.players.remove(id);
    Matter.World.remove(this.world, player.ship)
  }

  movePlayer(id, data) {
    let player = this.players.get(id);
    if (player) player.move(data.keyboardState);
  }

  getAllPos() {
    const players = this.players.values();
    const positions = [];
    for (let i = 0; i < players.length; i++) {
      positions.push(players[i].ship.position)
    }
    return positions;
  }

  getAllForce(){
    const players = this.players.values();
    const forces = [];
    for (let i = 0; i < players.length; i++) {
      forces.push(players[i].ship.force)
    }
    return forces;
  }
};

module.exports = ServerGame;