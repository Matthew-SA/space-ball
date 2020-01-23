const Util = require("./util");
const MovingObject = require("./moving_object");
const Ship = require("./ship");

const DEFAULTS = {
    COLOR: "#505050",
    RADIUS: 25,
    SPEED: 0
};

const GOLD_BALL = {
  COLOR: "#FFD517",
  RADIUS: 5,
  SPEED: 0
};

const SILVER_BALL = {
  COLOR: "#DBDBDB",
  RADIUS: 15,
  SPEED: 0
};

const BRONZE_BALL = {
  COLOR: "#E1945F",
  RADIUS: 25,
  SPEED: 0
};


class Ball extends MovingObject {
    constructor(options = {}) {
        options.color = options.color || DEFAULTS.COLOR;
        options.pos = options.pos || options.game.randomPosition();
        options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
        super(options);
        this.radius = options.radius || DEFAULTS.RADIUS;
    }

    collideWith(otherObject) {
        if (otherObject instanceof Ship) {
            // bounce off of ship -- need movement physics
            return true;
        } else if (otherObject instanceof Ball) {
            // bounce off of other ball -- need movement physics
            return true;
        }

        return false;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
        ctx.fill();
    }
}

module.exports = Ball;
