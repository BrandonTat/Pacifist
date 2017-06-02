const MovingObject = require("./moving_object");

class Bomb extends MovingObject {
  constructor(options) {
    options.bitmap = new createjs.Shape();
    options.pos = options.pos || options.game.randomBombPosition();
    options.vel = options.vel || [0, 0];
    super(options);
  }

  draw(stage) {
    this.bitmap.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 20);
    this.bitmap.x = this.pos[0];
    this.bitmap.y = this.pos[1];
    stage.addChild(this.bitmap);
  }

  move(delta) {
    this.pos[0] += .5;
    this.pos[1] += .5;
  }
}

module.exports = Bomb;
