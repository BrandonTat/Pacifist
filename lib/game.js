const Ship = require("./ship");

class Game {
  constructor() {
    this.ships = [];

    // this.addShip();
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

  draw(stage) {
    this.allObjects().forEach(object => {
      console.log(object);
      object.draw(stage);
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
Game.DIM_Y = 800;

module.exports = Game;
