const Util = require('./util');

class MovingObject {
  constructor(stage, options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.bitmap = options.bitmap;
    this.game = options.game;
    this.start = 0;

    stage.addChild(this.bitmap)
    // this.initiate(stage);
  }

  initiate(stage)  {
    this.bitmap.x = this.pos[0];
    this.bitmap.y = this.pos[1];
    // stage.addChild(this.bitmap);
  }

  draw() {
    this.bitmap.x = this.pos[0];
    this.bitmap.y = this.pos[1];
  }

  isCollidedWith(otherObject) {
    let x = Math.abs(this.pos[0] - otherObject.pos[0]);
    let y = Math.abs(this.pos[1] - otherObject.pos[1]);
    let type = (this.bitmap !== otherObject.bitmap);
    return (type && x < 15 && y < 15);
  }

  collideWith(otherObject) {}

  remove() {
    this.game.remove(this);
  }
}

module.exports = MovingObject;
