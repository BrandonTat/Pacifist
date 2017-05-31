const MovingObject = require("./moving_object");

class Enemy extends MovingObject {
  constructor(options) {
    options.bitmap = new createjs.Bitmap("./images/enemy.png");
    options.pos = options.pos || options.game.enemyPosition();
    options.vel = options.vel || [0, 0];
    super(options);
  }

  // chase(shipCoordX, shipCoordY) {
  //   let oldX = this.bitmap.x;
  //   let oldY = this.bitmap.y;
  //
  //   let newX = shipCoordX - oldX;
  //   let newY = shipCoordY - oldY;
  //
  //   this.bitmap.x = Math.floor(oldX + (newX * .005));
  //   this.bitmap.y = Math.floor(oldY + (newY * .005));
  // }

  power(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }

  chase(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel[0] * velocityScale,
      offsetY = this.vel[1] * velocityScale;

    this.bitmap.x += offsetX;
    this.bitmap.y += offsetY;
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = Enemy;
