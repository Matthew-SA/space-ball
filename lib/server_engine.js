// import Matter from "matter-js";
// import HashMap from 'hashmap';
// const HashMap = require("hashmap");
const Matter = require("matter-js");

var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
// const GameClient = require("../frontend/src/classes/game/gameClient");
class ServerEngine {
    constructor() {
        this.engine = Engine.create();
        this.world = this.engine.world;
        this.world.gravity.y = 0;
        this.world.gravity.x = 0;
        this.ball = Bodies.circle(800, 450, 50, {
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
        
    //     this.ceiling = Bodies.rectangle(0, -235, 3200, 500, {
    //       isStatic: true,
    //       collisionFilter: {
    //         group: 1,
    //         category: 0x1000,
    //         mask: 0x0011
    //       }
    //     });
    //     World.add(this.world, this.ceiling);

    //     this.floor = Bodies.rectangle(0, 1135, 3200, 500, {
    //       isStatic: true,
    //       collisionFilter: {
    //         group: 1,
    //         category: 0x1000,
    //         mask: 0x0011
    //       }
    //     });
    //     World.add(this.world, this.floor);

    //     this.topRight = Bodies.rectangle(1835, 0, 500, 700, {
    //       isStatic: true,
    //       collisionFilter: {
    //         group: 1,
    //         category: 0x1000,
    //         mask: 0x0011
    //       }
    //     });
    //     World.add(this.world, this.topRight);

    //     this.bottomRight = Bodies.rectangle(1835, 900, 500, 700, {
    //       isStatic: true,
    //       collisionFilter: {
    //         group: 1,
    //         category: 0x1000,
    //         mask: 0x0011
    //       }
    //     });
    //     World.add(this.world, this.bottomRight);

    //     this.topLeft = Bodies.rectangle(-235, 0, 500, 700, {
    //       isStatic: true,
    //       collisionFilter: {
    //         group: 1,
    //         category: 0x1000,
    //         mask: 0x0011
    //       }
    //     });
    //     World.add(this.world, this.topLeft);

    //     this.bottomLeft = Bodies.rectangle(-235, 900, 500, 700, {
    //       isStatic: true,
    //       collisionFilter: {
    //         group: 1,
    //         category: 0x1000,
    //         mask: 0x0011
    //       }
    //     });
    //     World.add(this.world, this.bottomLeft);

    //     this.leftGoal = Bodies.rectangle(-175, 450, 350, 200, {
    //       isStatic: true,
    //       // isSensor: true,
    //       render: {
    //         visible: false
    //       },
    //       collisionFilter: {
    //         group: -1,
    //         category: 0x0100,
    //         mask: 0x0010
    //       }
    //     });
    //     World.add(this.world, this.leftGoal);

    //     this.rightGoal = Bodies.rectangle(1775, 450, 350, 200, {
    //       isStatic: true,
    //       // isSensor: true,
    //       render: {
    //         visible: false
    //       },
    //       collisionFilter: {
    //         group: -1,
    //         category: 0x0100,
    //         mask: 0x0010
    //       }
    //     });
    //     World.add(this.world, this.rightGoal);

    //     // 
    //     this.leftSensor = Bodies.rectangle(-30, 450, 10, 200, {
    //       isStatic: true,
    //       isSensor: true,
    //       render: {
    //         visible: false
    //       },
    //       collisionFilter: {
    //         group: 0,
    //         category: 0x0011,
    //         mask: 0x0001
    //       }
    //     });
    //     World.add(this.world, this.leftSensor);

    //     this.rightSensor = Bodies.rectangle(1700, 450, 10, 200, {
    //       isStatic: true,
    //       isSensor: true,
    //       render: {
    //         visible: false
    //       },
    //       collisionFilter: {
    //         group: 0,
    //         category: 0x0011,
    //         mask: 0x0001
    //       }
    //     });
    //     World.add(this.world, this.rightSensor);
    }
}

module.exports = ServerEngine;