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
    let curX = this.bitmap.x;
    let curY = this.bitmap.y;

    let newX = posX - curX;
    let newY = posY - curY;

    this.bitmap.x = Math.floor(curX + (newX * .03));
    this.bitmap.y = Math.floor(curY + (newY * .03));
  }
}

module.exports = Ship;
