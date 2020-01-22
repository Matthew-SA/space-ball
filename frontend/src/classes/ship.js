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
        this.radius = 20;
    }

    power(impulse) {
        let xVel = impulse * Math.cos(this.direction) + this.vel[0]
        let yVel = impulse * Math.sin(this.direction) + this.vel[0]
        this.vel = [
            xVel > this.MAX_VELOCITY ? this.MAX_VELOCITY : xVel,
            yVel > this.MAX_VELOCITY ? this.MAX_VELOCITY : yVel
        ];
    }

    turn(angle) {
        this.direction += angle;
    }

    relocate() {
        this.pos = this.game.randomPosition();
        this.vel = [0, 0];
    }

    draw(ctx) {
        let img1 = new Image();
        img1.src = "https://i.imgur.com/gYhN1B5.png";
        let pattern = ctx.createPattern(img1, "no-repeat");


        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc(
          this.pos[0],
          this.pos[1],
          this.radius,
          2 * Math.PI + this.direction,
          0.5 * Math.PI + this.direction,
          true
        );
        ctx.fill();

        ctx.fillStyle = pattern;

        ctx.beginPath();
        ctx.arc(
          this.pos[0],
          this.pos[1],
          this.radius,
          2 * Math.PI + this.direction,
          0 + this.direction,
          true
        );
        ctx.fill();
    }
}

Ship.RADIUS = 15;

module.exports = Ship;