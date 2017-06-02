const MovingObject = require("./moving_object");
const Util = require("./util");

class Ship extends MovingObject {
  constructor(options) {
    options.bitmap = new createjs.Bitmap("./images/ship.png");
    options.vel = options.vel || [0, 0];
    options.color = options.color || "#FFD700";
    super(options);

    this.scale();
  }

  scale() {
    this.bitmap.scaleX = .3;
    this.bitmap.scaleY = .3;
  }

  // move(delta, mousePos) {
  //   let curX = this.bitmap.x;
  //   let curY = this.bitmap.y;
  //
  //   let newX = mousePos[0] - curX;
  //   let newY = mousePos[1] - curY;
  //
  //   this.pos[0] = Math.floor(curX + (newX * .03));
  //   this.pos[1] = Math.floor(curY + (newY * .03));
  // }
  
  maxAccel(accel) {
    if (accel[0] > 20) {
      accel[0] = 20;
    } else if (accel[0] < -20) {
      accel[0] = -20;
    }

    if (accel[1] > 20) {
      accel[1] = 20;
    } else if (accel[1] < -20) {
      accel[1] = -20;
    }

    return accel;
  }

  move(delta, mousePos) {
    let accel = Util.findVector(this.pos, [mousePos[0] - 50, mousePos[1] -50]);
    let maxAccel = this.maxAccel(accel);
    let newPos = [(this.pos[0] + maxAccel[0]), (this.pos[1] + maxAccel[1])];
    this.pos = newPos;
  }
}

module.exports = Ship;
