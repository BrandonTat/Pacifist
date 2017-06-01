const Util = require("./util");

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.bitmap = options.bitmap;
    this.color = options.color;
    this.game = options.game;
    this.start = 0;
  }

  draw(stage) {
    this.bitmap.x = this.pos[0];
    this.bitmap.y = this.pos[1];
    stage.addChild(this.bitmap);
  }

  isCollidedWith(otherObject) {
    let x = Math.abs(this.pos[0] - otherObject.pos[0]);
    let y = Math.abs(this.pos[1] - otherObject.pos[1]);
    let type = (this.bitmap !== otherObject.bitmap);
    return (type && x < 3 && y < 3);
  }

  collideWith(otherObject) {}
}

module.exports = MovingObject;
