/** 
 * @fileoverview This class encapsulates an active game on the server and handles game updates 
*/

const HashMap = require('hashmap');
const Player = require('./player');

class Game {
  constructor() {
    this.clients = new HashMap();
    this.players = new HashMap();
  }

  /**
  * Returns a list containing the connected Player objects.
  * @return {Array<Player>}
  */
  getPlayers() {
    return this.players.values();
  }

  /**
  * Returns callbacks that can be passed into an update()
  * method for an object so that it can access other elements and
  * entities in the game.
  * @return {Object<string, Function>}
  */
  // _callbacks() {
  //   return {
  //     players: Util.bind(this, this.players)
  //   };
  // }

  addNewPlayer(socket, data) {
    this.clients.set(socket.id, socket);
    this.players.set(socket.id, Player.create(socket.id, [10, 10]));
    console.log(this.players)
    console.log(this.clients)
  }

  removePlayer(id) {
    this.clients.remove(id);
    this.players.remove(id);
  }

  /**
  * Updates a player based on input received from their client.
  * @param {string} id The socket ID of the client
  * @param {Object} data The input received from the client
  */
  updatePlayerOnInput(id, data) {
    var player = this.players.get(id);
    if (player) {
      player.updateOnInput(data.keyboardState);
    }
  }

  /**
  * Steps the server forward in time. Updates every entity in the game.
  */
  update() {
    var players = this.getPlayers();
    for (var i = 0; i < players.length; ++i) {
      players[i].update();
    }
  }


  /**
  * Sends the state of the game to every client.
  */
  sendState() {
    var ids = this.clients.keys();
    for (var i = 0; i < ids.length; ++i) {
      this.clients.get(ids[i]).emit('update', {
        self: this.players.get(ids[i]),
        players: this.players.values().filter((player) => player.id != ids[i])
      });
    }
  }
}

/**
 * Factory method for a Game object.  -- is this necessary?
 * @return {Game}
 */
Game.create = function () {
  return new Game();
};

module.exports = Game;
