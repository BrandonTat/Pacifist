const MovingObject = require("./moving_object");
const Util = require("./util");
const Ship = require("./ship");

class Enemy extends MovingObject {
  constructor(stage, options) {
    options.shape = new createjs.Shape().set(options.pos);
    options.shape.graphics.s('#00ff00').ss(1);
    options.shape.graphics.drawRect(0, 0, 30, 30);
    options.vel = options.vel || [0, 0];
    super(stage, options);
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
    let shift = Math.floor(Math.random() * 10) + 5;
    this.shape.skewX += shift;
    this.shape.skewY += shift;

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
      $('#score').text(`Score: ${this.game.score}`);
      return true;
    }
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = Enemy;
