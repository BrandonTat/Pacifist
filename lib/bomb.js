const MovingObject = require("./moving_object");
const Util = require("./util");

class Bomb extends MovingObject {
  constructor(options) {
    options.bitmap = new createjs.Shape();
    options.pos = options.game.randomBombPosition();
    options.vel = Util.randomVec(10);
    super(options);
  }

  draw(stage) {
    this.bitmap.graphics.beginFill("Red").drawCircle(0, 0, 10);
    this.bitmap.x = this.pos[0];
    this.bitmap.y = this.pos[1];
    stage.addChild(this.bitmap);
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

  move(delta) {
    const velocityScale = delta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel[0] * velocityScale,
      offsetY = this.vel[1] * velocityScale;

    let maxVelocity = this.maxVelocity(offsetX, offsetY);
    const oldPos = this.pos;
    this.pos = [this.pos[0] + maxVelocity[0], this.pos[1] + maxVelocity[1]];
    if (this.game.isOutOfBounds(this.pos)) {
      if (this.pos[0] <= 0 || this.pos[0] >= 1000) {
        this.vel[0] *= -1;
      }

      if (this.pos[1] <= 0 || this.pos[0] >= 800) {
        this.vel[1] *= -1;
      }
      this.pos = oldPos;
    }
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = Bomb;
