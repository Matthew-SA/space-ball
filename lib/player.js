/** 
 * @fileoverview This is a class encapsulating a Player (server side logic). 
*/

const Entity2D = require('./Entity2D');

class Player extends Entity2D {
  /**
  * @param {string} id The socket ID of the Player
  */
  constructor(id) {
    super([10, 10], null, null, null, null, Player.HITBOX);
    // Entity2D.call(this, [10, 10], null, null, null, null, Player.HITBOX);
    this.id = id;
  }

  /**
  * Updates the Player based on received input.
  * @param {Object} keyboardState The keyboard input received.
  */
  updateOnInput(keyboardState) {
    this.vy = 100 * (Number(keyboardState.down) - Number(keyboardState.up));
    this.vx = 100 * (Number(keyboardState.right) - Number(keyboardState.left));
  }
}

Player.HITBOX = 10;

/**
 * Factory method for creating a Player
 * @param {string} id The socket ID of the Player
 * @return {Player}
 */
Player.create = function (id) {
  return new Player(id);
};

module.exports = Player;
