const MovingObject = require("./moving_object");
const Util = require("./util");

class Enemy extends MovingObject {
  constructor(options) {
    options.bitmap = new createjs.Bitmap("./images/enemy.png");
    options.pos = options.pos || options.game.enemyPosition();
    options.vel = options.vel || [0, 0];
    super(options);
  }
  
  maxVelocity(velX, velY) {
    let newX = velX;
    let newY = velY;

    if (velX > 1.5) {
      newX = 1.5;
    } else if (velX < -1.5) {
      newX = -1.5;
    }

    if (velY > 1.5) {
      newY = 1.5;
    } else if (velY < -1.5) {
      newY = -1.5;
    }

    return [newX, newY];
  }


  move(delta, mousePos) {
    const velocityScale = delta / NORMAL_FRAME_TIME_DELTA;
    let impulse = Util.findVector(this.pos, mousePos);
    let dir = Util.dir(impulse);
    let newVel = [this.vel[0] + dir[0], this.vel[1] + dir[1]];
    let maxVel = this.maxVelocity(newVel[0], newVel[1]);
    this.vel = maxVel;

    this.pos = [this.pos[0] + maxVel[0], this.pos[1] + maxVel[1]];
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = Enemy;
