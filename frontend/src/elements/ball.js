const Util = require("./util");
const MovingObject = require("./moving_object");
const Ship = require("./ship");

const DEFAULTS = {
    COLOR: "#505050",
    RADIUS: 25,
    SPEED: 0
};

class Ball extends MovingObject {
    constructor(options = {}) {
        options.color = DEFAULTS.COLOR;
        options.pos = options.pos || options.game.randomPosition();
        options.radius = DEFAULTS.RADIUS;
        options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
        super(options);
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
}

module.exports = Ball;
