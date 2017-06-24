const MovingObject = require("./moving_object");
const Util = require("./util");

class Ship extends MovingObject {
  constructor(stage, options) {
    options.bitmap = new createjs.Bitmap("./assets/images/ship.png");
    options.vel = options.vel || [0, 0];
    super(stage, options);

    this.scale();
  }

  scale() {
    this.bitmap.scaleX = .15;
    this.bitmap.scaleY = .15;
  }

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

    if (this.game.isOutOfBounds(newPos)) {
      if (newPos[0] <= 0 || newPos[0] >= 1000) {
        maxAccel[0] = 0;
      }

      if (newPos[1] <= 0 || newPos[0] >= 800) {
        maxAccel[1] = 0;
      }
    }

    this.pos = [(this.pos[0] + maxAccel[0]), (this.pos[1] + maxAccel[1])];
  }
}

module.exports = Ship;
