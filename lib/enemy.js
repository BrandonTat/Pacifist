const MovingObject = require("./moving_object");
const Util = require("./util");
const Ship = require("./ship");

class Enemy extends MovingObject {
  constructor(options) {
    options.bitmap = new createjs.Bitmap("./images/enemy.png");
    options.pos = options.pos || options.game.enemyPosition();
    options.vel = options.vel || [0, 0];
    super(options);
  }

  maxVelocity(velX, velY) {
    let newX = velX, newY = velY;

    if (velX > .02) {
      newX = .02;
    } else if (velX < -.02) {
      newX = -.02;
    }

    if (velY > .02) {
      newY = .02;
    } else if (velY < -.02) {
      newY = -.02;
    }

    return [newX, newY];
  }


  move(delta) {
    if (this.start < 100) {
      this.start += 1;
      return;
    }

    const velocityScale = delta / NORMAL_FRAME_TIME_DELTA;

    let impulse = Util.findVector(this.pos, this.game.ships[0].pos);
    let dir = Util.dir(impulse);
    let newVel = [this.vel[0] + dir[0], this.vel[1] + dir[1]];
    let maxVel = this.maxVelocity(newVel[0] * velocityScale, newVel[1] * velocityScale);
    this.vel = maxVel;


    this.pos = [this.pos[0] + maxVel[0], this.pos[1] + maxVel[1]];
  }

  collideWith(otherObject) {
    if (otherObject instanceof Ship) {
      this.game.over = true;
      return true;
    }
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = Enemy;
