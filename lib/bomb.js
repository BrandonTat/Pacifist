const MovingObject = require('./moving_object');
const Util = require('./util');
const Ship = require('./ship');

class Bomb extends MovingObject {
  constructor(stage, options) {
    options.shape = new createjs.Shape().set(options.pos);
    options.shape.graphics.beginFill('#00E5EE').drawPolyStar(0, 0, 20, 5, .5, -15);
    options.shape.filters = [new createjs.ColorFilter(1,1.5,1,1)];
    options.shape.cache(-20, -20, 40, 40);
    options.pos = options.pos;
    options.vel = Util.randomVec(1);
    super(stage, options);
  }

  maxVelocity(velX, velY) {
    let newX = velX, newY = velY;
    if (velX > 3) {
      newX = 3;
    } else if (velX < -3) {
      newX = -3;
    }

    if (velY > 3) {
      newY = 3;
    } else if (velY < -3) {
      newY = -3;
    }

    return [newX, newY];
  }

  move(delta, stage) {

    this.shape.updateCache();

    var tween = createjs.Tween.get(this.shape.filters[0], { loop: true })
    .to({redMultiplier:0, greenMultiplier:.7 }, 700)
    .to({redMultiplier:1, greenMultiplier:1.0 }, 700);

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
