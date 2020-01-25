import Matter from 'matter-js';
const Ball = require("./ball");
const Ship = require("./ship");
const Util = require("./util");
const Goal = require("./goal");


class Game {
    constructor() {
        this.balls = [];
        this.ships = [];
        this.goals = [];
        // this.addShip()
        // this.addBalls();
    }

    add(object) {
        if (object instanceof Ball) {
            this.balls.push(object);
        } else if (object instanceof Ship) {
            this.ships.push(object);
        } else if (object instanceof Goal){
            this.goals.push(object);
        } else {
            throw new Error("unknown type of object");
        }
    }



const KEY_W = 87;
const KEY_A = 65;
const KEY_S = 83;
const KEY_D = 68;
const KEY_SPACE = 32;
const KEY_SHIFT = 16;

var mouseIsDown = false;
var mp;
var keys = [];



    addGoal(){
        const goal = new Goal({
            pos: [Game.DIM_X/2, Game.DIM_Y/2],
            game: this
        })

        this.add(goal);
        return goal;
    }

    allObjects() {
        return [].concat(this.ships, this.balls);
    }

    checkCollisions() {
        const allObjects = this.allObjects();
        for (let i = 0; i < allObjects.length; i++) {
            for (let j = 0; j < allObjects.length; j++) {
                const obj1 = allObjects[i];
                const obj2 = allObjects[j];

                if (obj1.isCollidedWith(obj2)) {
                    const collision = obj1.collideWith(obj2);
                    if (collision) return;
                }
            }
        }
    }

    draw(ctx) {
        ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
        ctx.fillStyle = Game.BG_COLOR;
        ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
        this.goals[0].draw(ctx);
        this.allObjects().forEach((object) => {
            object.draw(ctx);

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