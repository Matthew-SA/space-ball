const Matter = require("matter-js");

class ServerPlayer {
  constructor(id, world) {
    this.id = id
    this.world = world;
    this.ship = Matter.Bodies.circle(450, 450, 30, {
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
  
  move(keyboardState) {
    if (keyboardState.up) {
      console.log(this.ship)
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