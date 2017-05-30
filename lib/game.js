const Ship = require("./ship");

class Game {
  constructor() {
    this.ships = [];

    this.addShip();
  }

  allObjects() {
    return [].concat(this.ships);
  }

  add(object) {
    if (object instanceof Ship) {
      this.ships.push(object);
    } else {
      throw "unknown type of object";
    }
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect = (0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach(object => {
      object.draw(ctx);
    });
  }

  middlePosition() {
    const midX = Game.DIM_X / 2;
    const midY = Game.DIM_Y / 2;
    return [midX, midY];
  }

  addShip() {
    const ship = new Ship({
      pos: this.middlePosition(),
      game: this
    });

    this.add(ship);

    return ship;
  }
}

Game.BG_COLOR = "#000000";
Game.DIM_X = 1000;
Game.DIM_Y = 700;

module.exports = Game;
