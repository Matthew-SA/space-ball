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

    addBalls() {
        for (let i = 0; i < Game.NUM_BALLS; i++) {
            this.add(new Ball({ game: this }));
        }
    }

    addShip() {
        const ship = new Ship({
          pos: [Game.DIM_X/2, Game.DIM_Y/2],
          game: this
        });

        this.add(ship);

        return ship;
    }

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
    }

    isOutOfBounds(object) {
        return ((object.pos[0] - object.radius) < 0) || ((object.pos[1] - object.radius) < 0) ||
            ((object.pos[0] + object.radius) > Game.DIM_X) || ((object.pos[1] + object.radius) > Game.DIM_Y);
    }

    moveObjects(delta) {
        this.allObjects().forEach((object) => {
            object.move(delta);
        });
    }

    randomPosition() {
        return [
            Game.DIM_X * Math.random(),
            Game.DIM_Y * Math.random()
        ];
    }

    remove(object) {
        if (object instanceof Ball) {
            this.balls.splice(this.balls.indexOf(object), 1);
        } else if (object instanceof Ship) {
            this.ships.splice(this.ships.indexOf(object), 1);
        } else {
            throw new Error("unknown type of object");
        }
    }

    step(delta) {
        this.moveObjects(delta);
        this.checkCollisions();
    }

    wrap(pos) {
        return [
            Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
        ];
    }

    bounce(pos) {
        return [
            Util.bounce(pos[0], Game.DIM_X), Util.bounce(pos[1], Game.DIM_Y)
        ];
    }
}

Game.BG_COLOR = "#000000";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 32;
Game.NUM_BALLS = 10;

module.exports = Game;