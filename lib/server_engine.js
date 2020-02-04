// import Matter from "matter-js";
// import HashMap from 'hashmap';
// const HashMap = require("hashmap");
const Matter = require("matter-js");
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
        // this.clients = new HashMap();
        // this.players = new HashMap();

        setInterval(function() {
          Matter.Engine.update(this.engine, 20);
        },20);
        /////I got the following snippet from StackOverFlow which makes things work///
        // run the engine
        // Matter.Engine.run(this.engine);
        //////////// -END- //////////////
    }

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
}

module.exports = ServerEngine;