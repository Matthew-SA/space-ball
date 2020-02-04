// import Matter from "matter-js";
// import HashMap from 'hashmap';
// const HashMap = require("hashmap");
const Matter = require("matter-js");
// const GameClient = require("../frontend/src/classes/game/gameClient");
class ServerEngine {
    constructor() {
        this.engine = Matter.Engine.create();
        this.world = this.engine.world;
        this.world.gravity.y = .5;
        this.world.gravity.x = 0;
        this.ball = Matter.Bodies.circle(500, 300, 50, {
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
        Matter.World.add(this.world, this.ball);

        this.ship = Matter.Bodies.circle(200, 300, 30, {
          density: 0.5,
          friction: 1,
          render: {
            sprite: {
              texture: "images/default_ship.png"
            }
          }
        });
        Matter.World.add(this.world, this.ship);
        
        // this.ceiling = Matter.Bodies.rectangle(0, 0, 2000, 30, {
        //   isStatic: true,
        //   render: {
        //     fillStyle: "#fc03a1"
        //   }
        // });
        // Matter.World.add(this.world, this.ceiling);

        // this.floor = Matter.Bodies.rectangle(0, 600, 2000, 30, {
        //   isStatic: true,
        //   render: {
        //     fillStyle: "#fc03a1"
        //   }
        // });
        // Matter.World.add(this.world, this.floor);


        // this.topLeft = Matter.Bodies.rectangle(0, 0, 30, 350, {
        //   isStatic: true,
        //   render: {
        //     fillStyle: "#fc03a1"
        //   }
        // });
        // Matter.World.add(this.world, this.topLeft);

        // this.topRight = Matter.Bodies.rectangle(1000, 0, 30, 350, {
        //   isStatic: true,
        //   render: {
        //     fillStyle: "#fc03a1"
        //   }
        // });
        // Matter.World.add(this.world, this.topRight);

        // this.bottomRight = Matter.Bodies.rectangle(1000, 600, 30, 350, {
        //   isStatic: true,
        //   render: {
        //     fillStyle: "#fc03a1"
        //   }
        // });
        // Matter.World.add(this.world, this.bottomRight);

        // this.bottomLeft = Matter.Bodies.rectangle(0, 600, 30, 350, {
        //   isStatic: true,
        //   render: {
        //     fillStyle: "#fc03a1"
        //   }
        // });
        // Matter.World.add(this.world, this.bottomLeft);





        ///keeps track of player and sockets///
        // this.clients = new HashMap();
        // this.players = new HashMap();

        // setInterval(function() {
        //   Matter.Engine.update(this.engine, 20);
        // },20);
        /////I got the following snippet from StackOverFlow which makes things work///
        // run the engine
        // Matter.Engine.run(this.engine);
        //////////// -END- //////////////
    }

    // createBall() {
    //     const ball = Matter.Bodies.circle(500, 300, 50, {
    //       density: 0.04,
    //       friction: 0.01,
    //       frictionAir: 0.00001,
    //       restitution: 0.8,
    //       render: {
    //         sprite: {
    //           texture: "images/earth_ball.png"
    //         }
    //       }
    //     });
    //     Matter.World.add(this.world, ball);
    //     return ball;
    // }
}

module.exports = ServerEngine;