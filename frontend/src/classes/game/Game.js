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
    this.otherPlayers = [];
    this.animationFrameId = 0;

    this.leftScore = 0;
    this.rightScore = 0;
    this.over = false;
    this.winner = null;
    
  }

  /**
   * Initializes the Game object and its child objects as well as setting the
   * event handlers.
   */
  init() {
    var context = this;
    this.socket.on("update", function(data) {
      context.receiveGameState(data);
    });
    this.socket.emit("player-join");
  }

  /**
   * This method begins the animation loop for the game.
   */
  animate() {
    this.animationFrameId = window.requestAnimationFrame(
      Util.bind(this, this.update)
    );
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
    console.log("self player is....?????")
    console.log(this.selfPlayer)
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
      this.draw();
    }
    this.animate();
  }

  /**
   * Draws the state of the game using Matterjs.
   */
  draw() {
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
              texture:
                "https://upload.wikimedia.org/wikipedia/commons/7/7f/PIA23165-Comet-C2018Y1-Animation-20190225.gif"
            },
            wireframes: false,
            showAngleIndicator: false
          }
        });
        engine.world.gravity.y = 0;
        engine.world.gravity.x = 0;

        // create your own ship using this.selfPlayer params
        const selfShip = Matter.Bodies.circle(this.selfPlayer.x, this.selfPlayer.y, 30, {
          density: 0.5,
          friction: 1,
          render: {
            sprite: {
              texture: "images/default_ship.png"
            }
          }
        });
        Matter.World.add(world, selfShip);

        // iterate through otherPlayers and create a ship for each
        for (var player of this.otherPlayers){
          const otherPlayerShip = Matter.Bodies.circle(player.x, player.y, 30, {
            density: 0.5,
            friction: 1,
            restitution: 0.5,
            render: {
              sprite: {
                texture: "images/default_ship.png"
              }
            }
          });

          Matter.World.add(world, otherPlayerShip);
        }

        /////I got the following snippet from StackOverFlow which makes things work///
        // run the engine
        Matter.Engine.run(engine);

        // run the renderer
        Matter.Render.run(render);
         ////////////// -END- //////////////

  }
}

Game.create = function(socket) {
  return new Game(socket);
};

export default Game;