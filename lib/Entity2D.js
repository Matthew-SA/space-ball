/**
 * @fileoverview This is a wrapper class for 2D entities.
 */

const Util = require('../shared/Util');

const DIMENSIONS = 2;

class Entity2D {
  /**
  * @param {Array<number>} position The position of the Entity2D
  * @param {Array<number>} velocity The velocity of the Entity2D
  * @param {Array<number>} acceleration The acceleration of the Entity2D
  * @param {number} orientation The orientation of the Entity2D (radians)
  * @param {number} mass The mass of the Entity2D
  * @param {number} hitbox The radius of the Entity2D's circular hitbox
  */
  constructor(position, velocity, acceleration, orientation, mass, hitbox) {
    this.position = position || [0, 0];
    this.velocity = velocity || [0, 0];
    this.acceleration = acceleration || [0, 0];
    this.orientation = orientation || 0;
    this.mass = mass || 1;
    this.hitbox = hitbox || 0;

    this.lastUpdateTime = 0;
    this.deltaTime = 0;

    Util.splitProperties(this, ['x', 'y'], 'position');
    Util.splitProperties(this, ['vx', 'vy'], 'velocity');
    Util.splitProperties(this, ['ax', 'ay'], 'acceleration');
  }

  /**
  * Applies a force to the Entity2D.
  * @param {Array<number>} force The force to apply
  */
  applyForce(force) {
    for (var i = 0; i < DIMENSIONS; ++i) {
      this.acceleration[i] += force[i] / this.mass;
    }
  };

  /**
  * Returns true if this Entity2D is contact with or intersecting another
  * Entity2D.
  * @param {Entity2D} other The other Entity2D to check against
  * @return {boolean}
  */
  isCollidedWith(other) {
    var minDistance = (this.hitbox + other.hitbox);
    return Util.getEuclideanDistance2(this._position, other.position) <=
      (minDistance * minDistance);
  };

  /**
  * Steps this Entity2D forward in time and updates the position, velocity,
  * and acceleration.
  * @param {?number=} deltaTime An optional deltaTime to update with
  */
  update(deltaTime) {
    var currentTime = (new Date()).getTime();
    if (deltaTime) {
      this.deltaTime = deltaTime;
    } else if (this.lastUpdateTime === 0) {
      this.deltaTime = 0;
    } else {
      this.deltaTime = (currentTime - this.lastUpdateTime) / 1000;
    }
    for (var i = 0; i < DIMENSIONS; ++i) {
      this.position[i] += this.velocity[i] * this.deltaTime;
      this.velocity[i] += this.acceleration[i] * this.deltaTime;
      this.acceleration[i] = 0;
    }
    this.lastUpdateTime = currentTime;
  };
}

module.exports = Entity2D;