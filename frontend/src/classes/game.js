import Matter from 'matter-js';
const Ball = require("./ball");
const Ship = require("./ship");
const Util = require("./util");



const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
const KEY_SPACE = 32;
const KEY_SHIFT = 16;

var mouseIsDown = false;
var mp;
var keys = [];


class Game {
    constructor(canvas, ctx) {
        this.canvas = canvas
        this.ctx = ctx
    }

    addBall() {
        const engine = Matter.Engine.create();
        const world = engine.world;
        const render = Matter.Render.create({
            canvas: this.canvas,
            engine: engine,
            options: {
            width: this.canvas.width,
            height: this.canvas.height,
            background: "#BBBBBB",
            wireframes: false,
            showAngleIndicator: false
            }
        });
        var ball = Matter.Bodies.circle(500, 300, 40, {
          density: 0.04,
          friction: 0.01,
          frictionAir: 0.00001,
          restitution: 0.8,
          render: {
            fillStyle: "#F35e66",
            strokeStyle: "black",
            lineWidth: 1
          }
        });
        Matter.World.add(world, ball);
    }

}
export default Game;