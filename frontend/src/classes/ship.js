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
        this.direction = 0;
        this.MAX_VELOCITY = 5;
    }

    power(impulse) {
        this.vel[0] += impulse[0];
        this.vel[1] += impulse[1];
    }

    turn(angle) {
        this.direction += angle;
    }

    relocate() {
        this.pos = this.game.randomPosition();
        this.vel = [0, 0];
    }

    draw(ctx) {
        let x = this.pos[0] + 50;
        let y = this.pos[1] + 50;

        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.moveTo(x, y);
        ctx.lineTo(x + 75, y + -180);
        ctx.lineTo(x + 150, y);
        ctx.scale(1, 1);
        ctx.rotate(Math.PI / 1);
        ctx.fill();
    }
}

Ship.RADIUS = 15;

module.exports = Ship;