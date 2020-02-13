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
        this.ball = Matter.Bodies.circle(800, 450, 50, {
          density: 0.04,
          friction: 0.2,
          frictionAir: 0.00001,
          restitution: 0.8,
          collisionFilter: {
            group: -1,
            category: 0x0001,
            mask: 0x1011
          }
        });
        Matter.World.add(this.world, this.ball);
        
        this.ceiling = Matter.Bodies.rectangle(0, -235, 3200, 500, {
          isStatic: true,
          collisionFilter: {
            group: 1,
            category: 0x1000,
            mask: 0x0011
          }
        });
        Matter.World.add(this.world, this.ceiling);

        this.floor = Matter.Bodies.rectangle(0, 1135, 3200, 500, {
          isStatic: true,
          collisionFilter: {
            group: 1,
            category: 0x1000,
            mask: 0x0011
          }
        });
        Matter.World.add(this.world, this.floor);

        this.topRight = Matter.Bodies.rectangle(1835, 0, 500, 700, {
          isStatic: true,
          collisionFilter: {
            group: 1,
            category: 0x1000,
            mask: 0x0011
          }
        });
        Matter.World.add(this.world, this.topRight);

        this.bottomRight = Matter.Bodies.rectangle(1835, 900, 500, 700, {
          isStatic: true,
          collisionFilter: {
            group: 1,
            category: 0x1000,
            mask: 0x0011
          }
        });
        Matter.World.add(this.world, this.bottomRight);

        this.topLeft = Matter.Bodies.rectangle(-235, 0, 500, 700, {
          isStatic: true,
          collisionFilter: {
            group: 1,
            category: 0x1000,
            mask: 0x0011
          }
        });
        Matter.World.add(this.world, this.topLeft);

        this.bottomLeft = Matter.Bodies.rectangle(-235, 900, 500, 700, {
          isStatic: true,
          collisionFilter: {
            group: 1,
            category: 0x1000,
            mask: 0x0011
          }
        });
        Matter.World.add(this.world, this.bottomLeft);

        this.leftGoal = Matter.Bodies.rectangle(-175, 450, 350, 200, {
          isStatic: true,
          // isSensor: true,
          render: {
            visible: false
          },
          collisionFilter: {
            group: -1,
            category: 0x0100,
            mask: 0x0010
          }
        });
        Matter.World.add(this.world, this.leftGoal);

        this.rightGoal = Matter.Bodies.rectangle(1775, 450, 350, 200, {
          isStatic: true,
          // isSensor: true,
          render: {
            visible: false
          },
          collisionFilter: {
            group: -1,
            category: 0x0100,
            mask: 0x0010
          }
        });
        Matter.World.add(this.world, this.rightGoal);

        // 
        this.leftSensor = Matter.Bodies.rectangle(-30, 450, 10, 200, {
          isStatic: true,
          isSensor: true,
          render: {
            visible: false
          },
          collisionFilter: {
            group: 0,
            category: 0x0011,
            mask: 0x0001
          }
        });
        Matter.World.add(this.world, this.leftSensor);

        this.rightSensor = Matter.Bodies.rectangle(1700, 450, 10, 200, {
          isStatic: true,
          isSensor: true,
          render: {
            visible: false
          },
          collisionFilter: {
            group: 0,
            category: 0x0011,
            mask: 0x0001
          }
        });
        Matter.World.add(this.world, this.rightSensor);
    }
}

module.exports = ServerEngine;