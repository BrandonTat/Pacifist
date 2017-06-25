const MovingObject = require("./moving_object");
const Util = require("./util");

class Ship extends MovingObject {
  constructor(stage, options) {
    options.shape = new createjs.Shape().set(options.pos);
    options.shape.graphics.s('white').ss(1);
    options.shape.graphics.beginFill('white').arc(0, 0, 18, 0, 6.29).endFill();
    options.vel = options.vel || [0, 0];
    super(stage, options);
  }

  maxAccel(accel) {
    if (accel[0] > 25) {
      accel[0] = 25;
    } else if (accel[0] < -25) {
      accel[0] = -25;
    }

    if (accel[1] > 25) {
      accel[1] = 25;
    } else if (accel[1] < -25) {
      accel[1] = -25;
    }

    return accel;
  }

  move(delta, mousePos) {
    let accel = Util.findVector(this.pos, [mousePos[0] - 50, mousePos[1] -50]);
    let maxAccel = this.maxAccel(accel);
    let newPos = [(this.pos[0] + maxAccel[0]), (this.pos[1] + maxAccel[1])];

    if (this.game.isOutOfBounds(newPos)) {
      if (newPos[0] <= 0 || newPos[0] >= this.game.DIM_X) {
        maxAccel[0] = 0;
      }

      if (newPos[1] <= 0 || newPos[0] >= this.game.DIM_Y) {
        maxAccel[1] = 0;
      }
    }

    this.pos = [(this.pos[0] + maxAccel[0]), (this.pos[1] + maxAccel[1])];
  }
}

module.exports = Ship;
