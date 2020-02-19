import BoundingBox from './entities/bounding_box'
var AXIS = {
  NONE: 1,
  HORIZONTAL: 2,
  VERTICAL: 3,
  BOTH: 4
};

class ClientCamera {
  constructor(xView, yView, viewWidth, viewHeight, worldWidth, worldHeight) {
    this.xView = xView || 0;
    this.yView = yView || 0;

    this.xDeadZone = 0;
    this.yDeadZone = 0;

    this.wView = viewWidth;
    this.hView = viewHeight;

    this.axis = AXIS.BOTH;

    this.followed = null;

    this.viewPortRect = new BoundingBox(
      this.xView, this.yView, this.wView, this.hView
      );

    this.worldRect = new BoundingBox(0, 0, worldWidth, worldHeight);
  }

  follow(gameObject, xDeadZone, yDeadZone) {
    this.followed = gameObject;
    this.xDeadZone = xDeadZone;
    this.yDeadZone = yDeadZone;
  }

  update() {
    if (this.followed != null) {
      if (this.axis === AXIS.HORIZONTAL || this.axis === AXIS.BOTH) {
        if (this.followed.pos.x - this.xView + this.xDeadZone > this.wView) {
          this.xView = this.followed.pos.x - (this.wView - this.xDeadZone)
        } else if (this.followed.pos.x - this.xDeadZone < this.xView) {
          this.xView = this.followed.pos.x - this.xDeadZone;
        }
      }
    }
    if (this.axis === AXIS.VERTICAL || this.axis === AXIS.BOTH) {
      if (this.followed.pos.y - this.yView + this.yDeadZone > this.hView) {
        this.yView = this.followed.pos.y - (this.hView - this.yDeadZone)
      } else if (this.followed.pos.y - this.yDeadZone < this.yView) {
        this.yView = this.followed.pos.y - this.yDeadZone;
      }
    }

    this.viewPortRect.set(this.xView, this.yView, this.wView, this.hView);

    if (!this.viewPortRect.within(this.worldRect)) {
      if (this.viewPortRect.left < this.worldRect.left) {
        this.xView = this.worldRect.left;
      }
      if (this.viewPortRect.top < this.worldRect.top) {
        this.yView = this.worldRect.top;
      }
      if (this.viewPortRect.right > this.worldRect.right) {
        this.xView = this.worldRect.right - this.wView;
      }
      if (this.viewPortRect.bottom > this.worldRect.bottom) {
        this.yView = this.worldRect.bottom - this.hView;
      }
    }
  }
}

export default ClientCamera;