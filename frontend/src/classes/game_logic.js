// import GameComponent from '../components/game/game';
import Matter from "matter-js";
import key from "keymaster";

//websocket client setup
import io from "socket.io-client";

class gameLogic {
  constructor() {
    this.socket = io();
    this.gameState = {
      // ballPositionX: ball.position.x,
      // ballPositionY: ball.position.y
    };
    this.leftScore = 0;
    this.rightScore = 0;
    this.over = false;
    this.winner = null;
  }

  checkScore() {
    if (this.leftScore === 10) {
      this.over = true;
      this.winner = "left";
    } else if (this.rightScore === 10) {
      this.over = true;
      this.winner = "right";
    }

    return {
      leftScore: this.leftScore,
      rightScore: this.rightScore,
      over: this.over,
      winner: this.winner
    };
  }

  playGame() {
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext("2d");

        const engine = Matter.Engine.create();
        const world = engine.world;
        const render = Matter.Render.create({
          canvas: canvas,
          engine: engine,
          options: {
            width: 1000,
            height: 600,
            // background: '#000000',
            sprite: {
              texture: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/PIA23165-Comet-C2018Y1-Animation-20190225.gif'
            },
            wireframes: false,
            showAngleIndicator: false
          }
        });
        engine.world.gravity.y = 0;
        engine.world.gravity.x = 0;
        
        // const leftShip = Matter.Bodies.circle(200, 300, 30, {
        //   density: 0.5,
        //   friction: 1,
        //   render: {
        //     sprite: {
        //     texture: "images/default_ship.png"
        //     }
        //   }
        // });
        Matter.World.add(world, leftShip);
        
        // const rightShip = Matter.Bodies.circle(800, 300, 30, {
        //   density: 0.5,
        //   friction: 1,
        //   restitution: 0.5,
        //   render: {
        //     sprite: {
        //     texture: "images/default_ship.png"
        //     }
        //   }
        // });
        
        Matter.World.add(world, rightShip);
        
        // const ball = Matter.Bodies.circle(500, 300, 50, {
        //   density: 0.04,
        //   friction: 0.01,
        //   frictionAir: 0.00001,
        //   restitution: 0.8,
        //   render: {
        //     sprite: {
        //       texture: "images/earth_ball.png"
        //     }
        //   }
        // });
        
        Matter.World.add(world, ball);
        
        // const ceiling = Matter.Bodies.rectangle(0, 0, 2000, 30, {
        //   isStatic: true,
        //   render: {
        //     fillStyle: "#fc03a1"
        //   }
        // });
        Matter.World.add(world, ceiling);
        
        // const floor = Matter.Bodies.rectangle(0, 600, 2000, 30, {
        //   isStatic: true,
        //   render: {
        //     fillStyle: "#fc03a1"
        //   }
        // });
        Matter.World.add(world, floor);
        
        // const topLeft = Matter.Bodies.rectangle(0, 0, 30, 350, {
        //   isStatic: true,
        //   render: {
        //     fillStyle: "#fc03a1"
        //   }
        // });
        Matter.World.add(world, topLeft);
        
        // const topRight = Matter.Bodies.rectangle(1000, 0, 30, 350, {
        //   isStatic: true, 
        //   render: {
        //     fillStyle: "#fc03a1"
        //   }
        // });
        Matter.World.add(world, topRight);
        
        // const bottomRight = Matter.Bodies.rectangle(1000, 600, 30, 350, {
        //   isStatic: true,
        //   render: {
        //     fillStyle: "#fc03a1"
        //   }
        // });
        Matter.World.add(world, bottomRight);
        
        // const bottomLeft = Matter.Bodies.rectangle(0, 600, 30, 350, {
        //   isStatic: true,
        //   render: {
        //     fillStyle: "#fc03a1"
        //   }
        // });
        Matter.World.add(world, bottomLeft);
        
        // const leftGoal = Matter.Bodies.rectangle(0, 300, 1, 250, {
        //   isStatic: true,
        //   isSensor: true,
        //   render: {
        //     visible: false
        //   }
        // });
        Matter.World.add(world, leftGoal);
        
        // const rightGoal = Matter.Bodies.rectangle(1000, 300, 1, 250, {
        //   isStatic: true,
        //   isSensor: true,
        //   render: {
        //     visible: false
        //   }
        // });
        Matter.World.add(world, rightGoal);
        
        
        key('w', () => {
          this.socket.emit('test-function', "UP!")
          Matter.Body.applyForce(leftShip, leftShip.position, {
            x: 0,
            y: -10
          });
        });
        
        key('s', () => {
          this.socket.emit('test-function', "DOWN!")
          Matter.Body.applyForce(leftShip, leftShip.position, {
            x: 0,
            y: 10
          });
        })
        
        key('a', () => {
          this.socket.emit('test-function', "LEFT!")
          Matter.Body.applyForce(leftShip, leftShip.position, {
            x: -10,
            y: 0
          });
        });
        
        key('d', () => {
          this.socket.emit('test-function', "RIGHT!")
          Matter.Body.applyForce(leftShip, leftShip.position, {
            x: 10,
            y: 0
          });
        });
        
        
        Matter.Engine.run(engine);
        Matter.Render.run(render);
        
        let that = this;
        
        
        Matter.Events.on(engine, "collisionEnd", function(event) {
          var pairs = event.pairs;
        
          for (var i = 0, j = pairs.length; i !== j; ++i) {
            var pair = pairs[i];
        
            if (
              (pair.bodyA === rightGoal && pair.bodyB === ball) ||
              (pair.bodyB === rightGoal && pair.bodyA === ball)
            ) {
              that.leftScore += 1;
              Matter.Body.setPosition(ball, { x: 500, y: 300 });
              Matter.Body.setVelocity(ball, { x: 0, y: 0 });
              Matter.Body.setAngularVelocity(ball, 0);
              Matter.Body.setPosition(leftShip, { x: 200, y: 300 });
              Matter.Body.setVelocity(leftShip, { x: 0, y: 0 });
              Matter.Body.setPosition(rightShip, { x: 800, y: 300 });
              Matter.Body.setVelocity(rightShip, { x: 0, y: 0 });
              // console.log(that.leftScore);
            } else if (
              (pair.bodyA === leftGoal && pair.bodyB === ball) ||
              (pair.bodyB === leftGoal && pair.bodyA === ball)
            ) {
              that.rightScore += 1;
              Matter.Body.setPosition(ball, { x: 500, y: 300 });
              Matter.Body.setVelocity(ball, { x: 0, y: 0 });
              Matter.Body.setAngularVelocity(ball, 0);
              Matter.Body.setPosition(leftShip, { x: 200, y: 300 });
              Matter.Body.setVelocity(leftShip, { x: 0, y: 0 });
              Matter.Body.setPosition(rightShip, { x: 800, y: 300 });
              Matter.Body.setVelocity(rightShip, { x: 0, y: 0 });
              // console.log(that.rightScore);
            } else if (
              (pair.bodyA === leftGoal && pair.bodyB === leftShip) ||
              (pair.bodyB === leftGoal && pair.bodyA === leftShip)
            ) {
              Matter.Body.setPosition(leftShip, { x: 200, y: 300 });
              Matter.Body.setVelocity(leftShip, { x: 0, y: 0 });
            } else if (
              (pair.bodyA === rightGoal && pair.bodyB === leftShip) ||
              (pair.bodyB === rightGoal && pair.bodyA === leftShip)
            ) {
              Matter.Body.setPosition(leftShip, { x: 200, y: 300 });
              Matter.Body.setVelocity(leftShip, { x: 0, y: 0 });
            } else if (
              (pair.bodyB === leftGoal && pair.bodyA === rightShip) ||
              (pair.bodyB === leftGoal && pair.bodyA === rightShip)
            ) {
              Matter.Body.setPosition(rightShip, { x: 800, y: 300 });
              Matter.Body.setVelocity(rightShip, { x: 0, y: 0 });
            } else if (
              (pair.bodyB === rightGoal && pair.bodyA === rightShip) ||
              (pair.bodyB === rightGoal && pair.bodyA === rightShip)
            ) {
              Matter.Body.setPosition(rightShip, { x: 800, y: 300 });
              Matter.Body.setVelocity(rightShip, { x: 0, y: 0 });
            }
          }
        });
    }
}

export default gameLogic;
