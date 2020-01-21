const MovingObject = require("./moving_object");
const Util = require("./util");


class Ship extends MovingObject {
    constructor(options) {
        // options.radius = Ship.RADIUS;
        options.vel = options.vel || [0, 0];
        options.color = options.color;
        super(options);
    }

    power(impulse) {
        this.vel[0] += impulse[0];
        this.vel[1] += impulse[1];
    }

    relocate() {
        this.pos = this.game.randomPosition();
        this.vel = [0, 0];
    }

    draw(ctx) {
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.moveTo(75, 50);
        ctx.lineTo(100, 75);
        ctx.lineTo(100, 25);
        ctx.fill();
    }
}

Ship.RADIUS = 15;

module.exports = Ship;