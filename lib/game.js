class Game {
  constructor() {
    this.enemies = [];
    this.ships = [];
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect = (0, 0, Game.DIM_X, Game.DIM_Y);
  }
}

Game.BG_COLOR = "#000000";
Game.DIM_X = 1000;
Game.DIM_Y = 600;

module.exports = Game;
