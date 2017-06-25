class Particle {
  constructor(stage) {
    this.stage = stage;
    this.lifetime = 3;
    this.radius = 8;
    this.color = "";
    this.pos = [0, 0];
    this.vel = [0, 0];
    this.shape = null;
  }

  isDead() {
    return this.lifetime < 1 || (this.shape !== null && this.shape.scale >= 0);
  }

  draw() {
    this.lifetime -= 1;

    if (this.shape === null) {
      this.shape = new createjs.Shape();
      this.shape.graphics.s(this.color).ss(1);
      this.shape.graphics.drawCircle(this.radius*2, this.radius*2, this.radius);

      this.stage.addChild(this.shape);
    }

    this.shape.x = this.pos[0];
    this.shape.y = this.pos[1];

    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }
}

module.exports = Particle;
