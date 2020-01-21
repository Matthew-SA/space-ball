const MovingObject = require("./moving_object");
// const Util = require("./util");

function randomColor() {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 3; i++) {
    color += hexDigits[Math.floor(Math.random() * 16)];
  }

  return color;
}

class Ship extends MovingObject {
    constructor(options) {
        // options.radius = Ship.RADIUS;
        options.vel = options.vel || [0, 0];
        options.color = options.color || randomColor();
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
        ctx.lineTo(200, 75);
        ctx.lineTo(200, 25);
        ctx.fill();
    }
}

Ship.RADIUS = 15;

module.exports = Ship;