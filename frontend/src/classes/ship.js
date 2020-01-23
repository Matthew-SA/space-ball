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
        this.MAX_VELOCITY = 2;
        this.radius = 20;
        this.speed = 0;
        this.mod = 0;
    }

    power(impulse) {
        let xVel = impulse * Math.cos(this.direction) + this.vel[0]
        let yVel = impulse * Math.sin(this.direction) + this.vel[1]
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
        let redShip = new Image();
        redShip.src = "https://i.imgur.com/18Y6rUW.png";
        // let pattern = ctx.createPattern(img1, "no-repeat");
        // let x = this.pos[0]
        // let y = this.pos[1]
        
        // ctx.save();
        // ctx.drawImage(redShip, x, y);
        // ctx.translate(-x, -y);
        // ctx.rotate((Math.PI / 180) * this.direction);
        // ctx.drawImage(redShip, -(redShip.width / 2), -(redShip.height / 2));
        // ctx.restore();


          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.lineTo(this.pos[0], this.pos[1]);
          ctx.arc(
            this.pos[0],
            this.pos[1],
            this.radius,
            this.direction + 0.99 * Math.PI,
            this.direction + 1.01 * Math.PI,
            true
          );
          ctx.lineTo(this.pos[0], this.pos[1]);
          ctx.fill();
          ctx.stroke();
        
        // ctx.fillStyle = this.color;
        // ctx.translate(this.x, this.y);
        // ctx.rotate(this.angle * Math.PI / 180);
        // ctx.fillRect( -1* this.width/2 , -1* this.height/2, this.width, this.height); //center context to get a center rotation
        // ctx.restore(); 

        // DRAW IMAGE OF RED SHIP:
        // ctx.translate(this.pos[0], this.pos[1]);
        // ctx.rotate((Math.PI / 180) * this.direction);
        // ctx.translate(x, y);
        // ctx.rotate((Math.PI / 180) * this.direction);
        // ctx.translate(-x, -y);
        // ctx.drawImage(redShip, x, y);
        // ctx.translate(x, y);

        // ctx.rotate((Math.PI / 180) * -this.direction);
        // ctx.translate(-this.pos[0], -this.pos[1]);
        

        // DRAW CIRCLE
        // ctx.fillStyle = this.color;

        // ctx.beginPath();
        // ctx.arc(
        //   this.pos[0],
        //   this.pos[1],
        //   this.radius,
        //   1.5 * Math.PI + this.direction,
        //   -0.5 * Math.PI + this.direction,
        //   true
        // );
        // ctx.fill();
    }
}

Ship.RADIUS = 15;

module.exports = Ship;