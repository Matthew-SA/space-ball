const Matter = require("matter-js");

var World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body;
class ServerPlayer {
  constructor(id, user, team, world) {
    this.id = id
    this.user = user
    this.team = team
    this.world = world;
    this.jetDirection = { x: 0, y: 0 }
    this.ship = Bodies.circle(400, 400, 30, {
      density: 0.2,
      friction: 1,
      collisionFilter: {
        group: 1,
        category: 0x0010,
        mask: 0x1111
      },
      frictionAir: .08
    });
    World.add(world, this.ship);
  }

  move(keyboardState) {
    if (keyboardState.up) {
      Body.applyForce(this.ship, this.ship.position, {
        x: 0,
        y: -2.4
      })
      this.jetDirection.y += 1
    }
    if (keyboardState.right) {
      Body.applyForce(this.ship, this.ship.position, {
      x: 2.4,
      y: 0
      })
    this.jetDirection.x += 1
    }
    if (keyboardState.down) {
      Body.applyForce(this.ship, this.ship.position, {
        x: 0,
        y: 2.4
      })
      this.jetDirection.y -= 1
    }
    if (keyboardState.left) {
      Body.applyForce(this.ship, this.ship.position, {
        x: -2.4,
        y: 0
      })
      this.jetDirection.x -= 1
    }
  }

  resetJetDirection() {
    this.jetDirection.x = 0;
    this.jetDirection.y = 0;
  }
}

module.exports = ServerPlayer;