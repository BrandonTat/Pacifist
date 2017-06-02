const MovingObject = require('./moving_object');
const Util = require('./util');
const Ship = require('./ship');

class Bomb extends MovingObject {
  constructor(options) {
    options.bitmap = new createjs.Bitmap("./assets/images/bomb.png");
    options.pos = options.pos;
    options.vel = Util.randomVec(.01);
    super(options);

    this.scale();
  }

  scale() {
    this.bitmap.scaleX = .2;
    this.bitmap.scaleY = .2;
  }

  maxVelocity(velX, velY) {
    let newX = velX, newY = velY;
    if (velX > .3) {
      newX = .3;
    } else if (velX < -.3) {
      newX = -.3;
    }

    if (velY > .3) {
      newY = .3;
    } else if (velY < -.3) {
      newY = -.3;
    }

    return [newX, newY];
  }

  move(delta, stage) {
    const velocityScale = delta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel[0] * velocityScale,
      offsetY = this.vel[1] * velocityScale;

    let maxVelocity = this.maxVelocity(offsetX, offsetY);
    const oldPos = this.pos;
    this.pos = [this.pos[0] + maxVelocity[0], this.pos[1] + maxVelocity[1]];
    if (this.game.isOutOfBounds(this.pos)) {
      if (this.pos[0] <= 0 || this.pos[0] >= 945) {
        this.vel[0] *= -1;
      }

      if (this.pos[1] <= 0 || this.pos[1] >= 740) {
        this.vel[1] *= -1;
      }
      this.pos = oldPos;
    }
  }

  collideWith(otherObject, stage) {
    if (otherObject instanceof Ship) {
      this.game.explode(this, stage);
      return true;
    }
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = Bomb;
