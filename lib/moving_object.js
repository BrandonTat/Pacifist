const Util = require('./util');

class MovingObject {
  constructor(stage, options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.shape = options.shape;
    this.game = options.game;
    this.start = 0;
    
    stage.addChild(this.shape);
  }

  draw() {
    this.shape.x = this.pos[0];
    this.shape.y = this.pos[1];
  }

  isCollidedWith(otherObject) {
    let x = Math.abs(this.shape.x - otherObject.shape.x);
    let y = Math.abs(this.shape.y - otherObject.shape.y);
    let type = (this.shape !== otherObject.shape);
    return (type && x < 25 && y < 15);
  }

  collideWith(otherObject) {}

  remove() {
    this.game.remove(this);
  }
}

module.exports = MovingObject;
