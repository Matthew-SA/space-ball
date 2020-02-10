const Matter = require("matter-js");

class ServerPlayer {
  constructor(id, world) {
    this.id = id
    this.world = world;
    let startX = this.getRandomInt(100, 1500)
    let startY = this.getRandomInt(100, 800)
    this.ship = Matter.Bodies.circle(startX, startY, 30, {
      density: 0.2,
      friction: 1,
      collisionFilter: {
        group: 1,
        category: 0x0010,
        mask: 0x1111
      },
      frictionAir: .08
    });
    Matter.World.add(world, this.ship);
  }
  
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  move(keyboardState) {
    if (keyboardState.up) {
        Matter.Body.applyForce(this.ship, this.ship.position, {
          x: 0,
          y: -2.4
        })
      }
      if (keyboardState.right) {
        Matter.Body.applyForce(this.ship, this.ship.position, {
          x: 2.4,
          y: 0
        })
      }
      if (keyboardState.down) {
        Matter.Body.applyForce(this.ship, this.ship.position, {
          x: 0,
          y: 2.4
        })
      }
      if (keyboardState.left) {
        Matter.Body.applyForce(this.ship, this.ship.position, {
          x: -2.4,
          y: 0
        })
      }
  }
}

module.exports = ServerPlayer;