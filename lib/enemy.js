const MovingObject = require("./moving_object");
const Util = require("./util");
const Ship = require("./ship");

class Enemy extends MovingObject {
  constructor(stage, options) {
    options.bitmap = new createjs.Bitmap("./assets/images/enemy.png");
    options.pos = options.pos
    options.vel = options.vel || [0, 0];
    super(stage, options);

    this.scale();
  }

  scale() {
    this.bitmap.scaleX = .7;
    this.bitmap.scaleY = .7;
  }

  maxVelocity(velX, velY) {
    let newX = velX, newY = velY;

    if (velX > 5) {
      newX = 5;
    } else if (velX < -5) {
      newX = -5;
    }

    if (velY > 5) {
      newY = 5;
    } else if (velY < -5) {
      newY = -5;
    }

    return [newX, newY];
  }


  move(delta) {
    if (this.start < 45) {
      this.start += 1;
      return;
    }

    let impulse = Util.findVector(this.pos, this.game.ships[0].pos);
    let dir = Util.dir(impulse);
    let newVel = [this.vel[0] + dir[0], this.vel[1] + dir[1]];
    let maxVel = this.maxVelocity(newVel[0], newVel[1]);
    this.vel = maxVel;


    this.pos = [this.pos[0] + maxVel[0], this.pos[1] + maxVel[1]];
  }

  collideWith(otherObject) {
    if (otherObject instanceof Ship) {
      this.game.over = true;
      $('#gameOverModal').css('visibility', 'visible');
      $('#score').text(`Final Score: ${this.game.score}`);
      return true;
    }
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = Enemy;
