// import Matter from "matter-js";
// import HashMap from 'hashmap';
// const HashMap = require("hashmap");
const Matter = require("matter-js");
// const GameClient = require("../frontend/src/classes/game/gameClient");
class ServerEngine {
    constructor() {
        this.engine = Matter.Engine.create();
        this.world = this.engine.world;
        this.world.gravity.y = 0;
        this.world.gravity.x = 0;
        this.ball = Matter.Bodies.circle(500, 300, 50, {
          density: 0.04,
          friction: 0.2,
          frictionAir: 0.00001,
          restitution: 0.8,
        });
        Matter.World.add(this.world, this.ball);

        this.ship = Matter.Bodies.circle(200, 300, 30, {
          density: 0.5,
          friction: 1,
        });
        Matter.World.add(this.world, this.ship);
        
        this.ceiling = Matter.Bodies.rectangle(0, -235, 3200, 500, { isStatic: true });
        Matter.World.add(this.world, this.ceiling);

        this.floor = Matter.Bodies.rectangle(0, 1135, 3200, 500, { isStatic: true });
        Matter.World.add(this.world, this.floor);

        this.topLeft = Matter.Bodies.rectangle(-235, 0, 500, 700, { isStatic: true });
        Matter.World.add(this.world, this.topLeft);

        this.topRight = Matter.Bodies.rectangle(1835, 0, 500, 700, { isStatic: true });
        Matter.World.add(this.world, this.topRight);

        this.bottomRight = Matter.Bodies.rectangle(1835, 900, 500, 700, { isStatic: true });
        Matter.World.add(this.world, this.bottomRight);

        this.bottomLeft = Matter.Bodies.rectangle(-235, 900, 500, 700, { isStatic: true });
        Matter.World.add(this.world, this.bottomLeft);
    }
}

module.exports = ServerEngine;