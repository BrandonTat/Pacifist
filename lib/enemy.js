const MovingObject = require("./moving_object");

class Enemy extends MovingObject {
  constructor(options) {
    options.bitmap = new createjs.Bitmap("./images/enemy.png");
    options.pos = options.pos || options.game.enemyPosition();
    options.vel = options.vel || [0, 0];
    super(options);
  }
}

module.exports = Enemy;
