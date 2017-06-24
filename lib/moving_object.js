const Util = require('./util');

class MovingObject {
  constructor(stage, options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.bitmap = options.bitmap;
    this.game = options.game;
    this.start = 0;

    stage.addChild(this.bitmap);
  }

  getBound(pos) {
    console.log(this.bitmap.hitTest(pos[0], pos[1]));
  }

  draw() {
    this.bitmap.x = this.pos[0];
    this.bitmap.y = this.pos[1];
  }

  isCollidedWith(otherObject) {
    // let x = Math.abs(this.pos[0] - otherObject.pos[0]);
    // let y = Math.abs(this.pos[1] - otherObject.pos[1]);
    // let type = (this.bitmap !== otherObject.bitmap);
    // return (type && x < 10 && y < 10);
    let x = Math.abs(this.bitmap.x - otherObject.bitmap.x);
    let y = Math.abs(this.bitmap.y - otherObject.bitmap.y);
    let type = (this.bitmap !== otherObject.bitmap);
    return (type && x < 25 && y < 15);
  }

  collideWith(otherObject) {}

  remove() {
    this.game.remove(this);
  }
}

module.exports = MovingObject;
