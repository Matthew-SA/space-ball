// import Matter from "matter-js";
// import HashMap from 'hashmap';
const Matter = require("matter-js");
const HashMap = require("hashmap");
const GameClient = require("../frontend/src/classes/game/gameClient");
class ServerEngine {

    constructor() {
        this.engine = Matter.Engine.create();
        this.world = this.engine.world;
        this.world.gravity.y = 0;
        this.world.gravity.x = 0;
        // this.ship = createShip();
        this.ball = createBall();
        // this.walls = createWalls();
        // this.leftGoal = createLeftGoal();
        // this.rightGoal = createRightGoal();
        // this.createWalls();

        ///keeps track of player and sockets///
        this.clients = new HashMap();
        this.players = new HashMap();

        setInterval(function() {
          Matter.Engine.update(this.engine, 20);
        },20);
        /////I got the following snippet from StackOverFlow which makes things work///
        // run the engine
        // Matter.Engine.run(this.engine);
        //////////// -END- //////////////
    }

    // createShip() {
    //     const ship = Matter.Bodies.circle(200, 300, 30, {
    //       density: 0.5,
    //       friction: 1,
    //       render: {
    //         sprite: {
    //         texture: "images/default_ship.png"
    //         }
    //       }
    //     });
    //     Matter.World.add(this.world, ship);
    // }

    createBall() {
        const ball = Matter.Bodies.circle(500, 300, 50, {
          density: 0.04,
          friction: 0.01,
          frictionAir: 0.00001,
          restitution: 0.8,
          render: {
            sprite: {
              texture: "images/earth_ball.png"
            }
          }
        });
        Matter.World.add(this.world, ball);
        return ball;
    }

    // createWalls() {
    //     const ceiling = Matter.Bodies.rectangle(0, 0, 2000, 30, {
    //       isStatic: true,
    //       render: {
    //         fillStyle: "#fc03a1"
    //       }
    //     });
    //     Matter.World.add(this.world, ceiling);
        
    //     const floor = Matter.Bodies.rectangle(0, 600, 2000, 30, {
    //       isStatic: true,
    //       render: {
    //         fillStyle: "#fc03a1"
    //       }
    //     });
    //     Matter.World.add(this.world, floor);
        
    //     const topLeft = Matter.Bodies.rectangle(0, 0, 30, 350, {
    //       isStatic: true,
    //       render: {
    //         fillStyle: "#fc03a1"
    //       }
    //     });
    //     Matter.World.add(this.world, topLeft);
        
    //     const topRight = Matter.Bodies.rectangle(1000, 0, 30, 350, {
    //       isStatic: true, 
    //       render: {
    //         fillStyle: "#fc03a1"
    //       }
    //     });
    //     Matter.World.add(this.world, topRight);
        
    //     const bottomRight = Matter.Bodies.rectangle(1000, 600, 30, 350, {
    //       isStatic: true,
    //       render: {
    //         fillStyle: "#fc03a1"
    //       }
    //     });
    //     Matter.World.add(this.world, bottomRight);
        
    //     const bottomLeft = Matter.Bodies.rectangle(0, 600, 30, 350, {
    //       isStatic: true,
    //       render: {
    //         fillStyle: "#fc03a1"
    //       }
    //     });
    //     Matter.World.add(this.world, bottomLeft);
    // }

    // createLeftGoal() {
    //     const leftGoal = Matter.Bodies.rectangle(0, 300, 1, 250, {
    //       isStatic: true,
    //       isSensor: true,
    //       render: {
    //         visible: false
    //       }
    //     });
    //     Matter.World.add(this.world, leftGoal);
    //     return leftGoal;
    // }
    
    // createRightGoal() {
    //     const rightGoal = Matter.Bodies.rectangle(1000, 300, 1, 250, {
    //       isStatic: true,
    //       isSensor: true,
    //       render: {
    //         visible: false
    //       }
    //     });
    //     Matter.World.add(this.world, rightGoal);
    //     return rightGoal;
    // }
}

module.exports = ServerEngine;