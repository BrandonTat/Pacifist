const MovingObject = require("./moving_object");

class Ship extends MovingObject {
  constructor(options) {
    options.bitmap = new createjs.Bitmap("./images/ship.png");
    options.vel = options.vel || [0, 0];
    options.color = options.color || "#FFD700";
    super(options);

    this.scale();
  }

  scale() {
    this.bitmap.scaleX = .3;
    this.bitmap.scaleY = .3;
  }

  move(posX, posY) {
    this.bitmap.x = posX;
    this.bitmap.y = posY;
  }
}

module.exports = Ship;
