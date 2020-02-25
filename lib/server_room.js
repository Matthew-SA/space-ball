import serverGame from './server_game'


class ServerRoom {
  constructor(room) {
    this.room = room
    this.players = new Map();
  }

  addPlayer(socket) {
    // this.players.set(socket.id, new ServerPlayer(socket.id, this.world));
  }

  removePlayer(id) {
    // let player = this.players.get(id)
    // this.players.remove(id);
    // Matter.World.remove(this.world, player.ship)
  }
}

module.exports = ServerRoom;