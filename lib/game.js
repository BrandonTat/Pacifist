const Ship = require("./ship");
const Enemy = require("./enemy");
const Util = require("./util");

class Game {
  constructor() {
    this.level = 1;
    this.ships = [];
    this.enemies = [];

    this.addEnemy();
  }

  allObjects() {
    return [].concat(this.ships, this.enemies);
  }

  add(object) {
    if (object instanceof Ship) {
      this.ships.push(object);
    } else if (object instanceof Enemy) {
      this.enemies.push(object);
    } else {
      throw "unknown type of object";
    }
  }

  draw(stage) {
    this.allObjects().forEach(object => {
      object.draw(stage);
    });
  }

  middlePosition() {
    const midX = Game.DIM_X / 2;
    const midY = Game.DIM_Y / 2;
    return [midX, midY];
  }

  randomEnemyPosition(wave) {
    let sectionX = Game.DIM_X / 10;
    let sectionY = Game.DIM_Y / 10;

    let posX = 0;
    let posY = 0;

    if (wave === 0) {
      posX = Util.randomInRange(1, sectionX);
      posY = Util.randomInRange(1, sectionY);
    }
    return [posX, posY];
  }

  addShip() {
    const ship = new Ship({
      pos: this.middlePosition(),
      game: this
    });

    this.add(ship);

    return ship;
  }

  addEnemy() {
    let numEnemies = this.level * 10;

    for(let i = 0; i < numEnemies/2; i++) {
      let enemyPosition = this.randomEnemyPosition(0);
      this.add(new Enemy({ game:this, pos: enemyPosition }));
    }
  }

  moveEnemies(timeDelta) {
    let ship = this.ships[0];
    this.enemies.forEach(enemy => {
      enemy.chase(timeDelta);
    });
  }

  // moveEnemies(shipX, shipY) {
  //   let ship = this.ships[0];
  //   this.enemies.forEach(enemy => {
  //     enemy.chase(shipX, shipY);
  //   });
  // }

  // moveObjects() {
  //   this.allObjects().forEach(object => {
  //     object.move()
  //   });
  // }

  step() {
    this.moveObjects();
    //this.check_collisions;
  }
}

Game.DIM_X = 1000;
Game.DIM_Y = 800;

module.exports = Game;
