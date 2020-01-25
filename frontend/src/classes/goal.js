const Util = require("./util");
const MovingObject = require("./moving_object");
const Ship = require("./ship");
const Ball = require("./ball");

const DIM_X = 1000;
const DIM_Y = 600;

const GOAL = {
  COLOR: "orange",
  HEIGHT: 200,
  WIDTH: 30,
};

class Goal{
  constructor() {
    this.color = GOAL.COLOR;
    this.height = GOAL.HEIGHT;
    this.width = GOAL.WIDTH;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "1";
    ctx.strokeStyle = this.color;
    ctx.rect(DIM_X - DIM_X, (DIM_Y/2 - this.height / 2), this.width, this.height, 1250, 100);
    ctx.rect((DIM_X - this.width), (DIM_Y/2 - this.height / 2), this.width, this.height, 1250, 100);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
  }
}


module.exports = Goal;
