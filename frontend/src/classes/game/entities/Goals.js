class Goals {
  constructor() {
    this.leftGoal = new Image();
    this.leftGoal.src = 'images/leftGoal.png'
    this.rightGoal = new Image();
    this.rightGoal.src = 'images/rightGoal.png'
  }

  clear(ctx, xView, yView) {
    ctx.clearRect(0 - xView, 510 - yView, 315, 781);
    ctx.clearRect(3485 - xView, 510 - yView, 315, 781);
  }

  draw(ctx, xView, yView) {
    ctx.drawImage(
      this.leftGoal,
      0 - xView,
      510 - yView,
    )
    ctx.drawImage(
      this.rightGoal,
      3485 - xView,
      510 - yView,
    )
  }
}

export default Goals;