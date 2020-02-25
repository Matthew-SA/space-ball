const Matter = require("matter-js");

var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

class ServerEngine {
    constructor() {
        this.engine = Engine.create();
        this.world = this.engine.world;
        this.world.gravity.y = 0;
        this.world.gravity.x = 0;
        this.ball = Bodies.circle(1900, 900, 100, {
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
        World.add(this.world, this.ball);
        
        this.ceiling = Bodies.rectangle(1900, -235, 3200, 500, {
          isStatic: true,
          collisionFilter: {
            group: 1,
            category: 0x1000,
            mask: 0x0011
          }
        });
        World.add(this.world, this.ceiling);

        this.floor = Bodies.rectangle(1900, 2035, 3200, 500, {
          isStatic: true,
          collisionFilter: {
            group: 1,
            category: 0x1000,
            mask: 0x0011
          }
        });
        World.add(this.world, this.floor);

        this.topLeft = Bodies.rectangle(65, 175, 500, 700, {
          isStatic: true,
          collisionFilter: {
            group: 1,
            category: 0x1000,
            mask: 0x0011
          }
        });
        World.add(this.world, this.topLeft);

        this.leftGoalBack = Bodies.rectangle(-235, 865, 500, 800, {
          isStatic: true,
          collisionFilter: {
            group: 1,
            category: 0x1000,
            mask: 0x0011
          }
        });
        World.add(this.world, this.leftGoalBack);

        this.bottomLeft = Bodies.rectangle(65, 1625, 500, 700, {
          isStatic: true,
          collisionFilter: {
            group: 1,
            category: 0x1000,
            mask: 0x0011
          }
        });
        World.add(this.world, this.bottomLeft);

        this.topRight = Bodies.rectangle(3735, 175, 500, 700, {
          isStatic: true,
          collisionFilter: {
            group: 1,
            category: 0x1000,
            mask: 0x0011
          }
        });
        World.add(this.world, this.topRight);

        this.rightGoalBack = Bodies.rectangle(4035, 865, 500, 800, {
          isStatic: true,
          collisionFilter: {
            group: 1,
            category: 0x1000,
            mask: 0x0011
          }
        });
        World.add(this.world, this.rightGoalBack);

        this.bottomRight = Bodies.rectangle(3735, 1625, 500, 700, {
          isStatic: true,
          collisionFilter: {
            group: 1,
            category: 0x1000,
            mask: 0x0011
          }
        });
        World.add(this.world, this.bottomRight);

       this.leftSensor = Bodies.rectangle(-139, 800, 500, 1000, {
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
        World.add(this.world, this.leftSensor);

      this.rightSensor = Bodies.rectangle(3937, 800, 500, 1000, {
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
        World.add(this.world, this.rightSensor);
    }
}

module.exports = ServerEngine;