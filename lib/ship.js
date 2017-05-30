const MovingObject = require("./moving_object");

class Ship extends MovingObject {
  constructor(options) {
    options.bitmap = new createjs.Bitmap("./images/ship.png");
    options.vel = options.vel || [0, 0];
    options.color = options.color || "#FFD700";
    super(options);
  }

  power(impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  }
}

Ship.RADIUS = 15;
module.exports = Ship;
