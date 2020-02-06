const HashMap = require('hashmap')
const Matter = require("matter-js");
const ServerEngine = require('./server_engine')
const ServerPlayer = require('./server_player')

class ServerGame {
  constructor() {
    // this.clients = new HashMap();
    this.players = new HashMap();
    this.serverEngine = new ServerEngine;
    this.engine = this.serverEngine.engine
    this.world = this.serverEngine.world;
    this.ball = this.serverEngine.ball;
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
};

module.exports = ServerGame;