import Drawing from './Drawing'
import Input from './Input'
import Util from '../shared/Util'
import Matter from "matter-js";
import key from "keymaster";

/**
 * @fileoverview This is a class encapsulating the client side of the game,
 *   which handles the rendering of the lobby and game and the sending of
 *   user input to the server.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */
/**
 * Creates a Game on the client side to render the players and entities.
 * @constructor
 * @param {Object} socket The socket connected to the server.
 * @param {Drawing} drawing The Drawing object that will render the game.
 */

class Game {

  constructor(socket) {
    this.socket = socket;

    this.selfPlayer = null;
    this.selfShip = null;
    this.otherPlayers = [];
    this.animationFrameId = 0;

    this.leftScore = 0;
    this.rightScore = 0;
    this.over = false;
    this.winner = null;

    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext("2d");

    this.engine = Matter.Engine.create();
    this.world = this.engine.world;

    this.render = Matter.Render.create({
      canvas: this.canvas,
      engine: this.engine,
      options: {
        width: 1000,
        height: 600,
        // background: '#000000',
        sprite: {
          texture:
            "https://upload.wikimedia.org/wikipedia/commons/7/7f/PIA23165-Comet-C2018Y1-Animation-20190225.gif"
        },
        wireframes: false,
        showAngleIndicator: false
      }
    });
    this.engine.world.gravity.y = 0;
    this.engine.world.gravity.x = 0;



    // iterate through otherPlayers and create a ship for each
    for (var player of this.otherPlayers){
      this.otherPlayerShip = Matter.Bodies.circle(player.x, player.y, 30, {
        density: 0.5,
        friction: 1,
        restitution: 0.5,
        render: {
          sprite: {
            texture: "images/default_ship.png"
          }
        }
      });

      Matter.World.add(this.world, this.otherPlayerShip);
    }

    // Create a ball
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



    // Add static walls
    this.ceiling = Matter.Bodies.rectangle(0, 0, 2000, 30, {
      isStatic: true,
      render: {
        fillStyle: "#fc03a1"
      }
    });
    Matter.World.add(this.world, this.ceiling);

    this.floor = Matter.Bodies.rectangle(0, 600, 2000, 30, {
      isStatic: true,
      render: {
        fillStyle: "#fc03a1"
      }
    });
    Matter.World.add(this.world, this.floor);

    this.topLeft = Matter.Bodies.rectangle(0, 0, 30, 350, {
      isStatic: true,
      render: {
        fillStyle: "#fc03a1"
      }
    });
    Matter.World.add(this.world, this.topLeft);

    this.topRight = Matter.Bodies.rectangle(1000, 0, 30, 350, {
      isStatic: true,
      render: {
        fillStyle: "#fc03a1"
      }
    });
    Matter.World.add(this.world, this.topRight);

    this.bottomRight = Matter.Bodies.rectangle(1000, 600, 30, 350, {
      isStatic: true,
      render: {
        fillStyle: "#fc03a1"
      }
    });
    Matter.World.add(this.world, this.bottomRight);

    this.bottomLeft = Matter.Bodies.rectangle(0, 600, 30, 350, {
      isStatic: true,
      render: {
        fillStyle: "#fc03a1"
      }
    });
    Matter.World.add(this.world, this.bottomLeft);


    // Add goals which are static, sensor, and invisible

    this.leftGoal = Matter.Bodies.rectangle(0, 300, 1, 250, {
      isStatic: true,
      isSensor: true,
      render: {
        visible: false
      }
    });
    Matter.World.add(this.world, this.leftGoal);

    this.rightGoal = Matter.Bodies.rectangle(1000, 300, 1, 250, {
      isStatic: true,
      isSensor: true,
      render: {
        visible: false
      }
    });
    Matter.World.add(this.world, this.rightGoal);

    /////I got the following snippet from StackOverFlow which makes things work///
    // run the engine
    Matter.Engine.run(this.engine);

    // run the renderer
    Matter.Render.run(this.render);
    ////////////// -END- //////////////

    // Matter.Engine.update(this.engine, 1000 / 60);
  }

  /**
   * Initializes the Game object and its child objects as well as setting the
   * event handlers.
   */
  init() {
    var context = this;
    this.socket.on("update", function(data) {
      context.receiveGameState(data);
      // THIS MAKES INFINITE SHIPS
      // DON'T DO THIS HERE
      context.createSelfShip();
    });
    this.socket.emit("player-join");
    // if(!this.selfPlayer){
    // }
    // debugger
  }

  /**
   * This method begins the animation loop for the game.
   */
  animate() {
    this.animationFrameId = window.requestAnimationFrame(
      Util.bind(this, this.update)
    );

            key("w", () => {
              this.socket.emit("test-function", "UP!");
              Matter.Body.applyForce(this.selfShip, this.selfShip.position, {
                x: 0,
                y: -10
              });
            });

            key("s", () => {
              this.socket.emit("test-function", "DOWN!");
              Matter.Body.applyForce(this.selfShip, this.selfShip.position, {
                x: 0,
                y: 10
              });
            });

            key("a", () => {
              this.socket.emit("test-function", "LEFT!");
              Matter.Body.applyForce(this.selfShip, this.selfShip.position, {
                x: -10,
                y: 0
              });
            });

            key("d", () => {
              this.socket.emit("test-function", "RIGHT!");
              Matter.Body.applyForce(this.selfShip, this.selfShip.position, {
                x: 10,
                y: 0
              });
            });
  }

  createSelfShip() {
    // create your own ship using this.selfPlayer params
    if (!this.selfShip) {
      this.selfShip = Matter.Bodies.circle(200, 300, 30, {
        density: 0.5,
        friction: 1,
        render: {
          sprite: {
            texture: "images/default_ship.png"
          }
        }
      });
      Matter.World.add(this.world, this.selfShip);
    }
  }

  /**
   * This method stops the animation loop for the game.
   */
  stopAnimation() {
    window.cancelAnimationFrame(this.animationFrameId);
  }

  /**
   * Updates the game's internal storage of all the powerups, called each time
   * the server sends packets.
   * @param {Object} state The game state received from the server.
   */
  receiveGameState(state) {
    this.selfPlayer = state["self"];
    this.otherPlayers = state["players"];
  }

  /**
   * Updates the state of the game client side and relays intents to the
   * server.
   */
  update() {
    if (this.selfPlayer) {
      // Emits an event for the containing the player's input.
      this.socket.emit("player-action", {
        keyboardState: {
          left: Input.LEFT,
          right: Input.RIGHT,
          up: Input.UP,
          down: Input.DOWN
        }
      });
      // this.draw();
    }
    this.animate();
  }

//   /**
//    * Draws the state of the game using Matterjs.
//    */
//   draw() {
//     ;
//   }
}

Game.create = function(socket) {
  return new Game(socket);
};

export default Game;