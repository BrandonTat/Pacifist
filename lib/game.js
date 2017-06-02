const Ship = require("./ship");
const Enemy = require("./enemy");
const Bomb = require("./bomb");
const Util = require("./util");

class Game {
  constructor() {
    this.over = true
    this.level = 1;
    this.ships = [];
    this.enemies = [];
    this.bombs = [];

    this.addShip();
    this.addEnemy();

    setInterval(this.addEnemy.bind(this), 3000);
    // setInterval(this.addBomb.bind(this), 5000);
  }

  allObjects() {
    return [].concat(this.ships, this.enemies, this.bombs);
  }

  add(object) {
    if (object instanceof Ship) {
      this.ships.push(object);
    } else if (object instanceof Enemy) {
      this.enemies.push(object);
    } else if (object instanceof Bomb) {
      this.bombs.push(object)
    }else {
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

  randomBombPosition() {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0 || pos[1] < 0) ||
      (pos[0] > Game.DIM_X || pos[1] > Game.DIM_Y);
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

  addBomb() {
    if (this.bombs.length > 5) {
      return;
    }
    let amount = this.bombs.length / 2;
    if (amount < 5) {
      amount = 2;
    }

    for (let i=0; i<amount; i++) {
      this.add(new Bomb({game: this}));
    }
  }

  moveObjects(delta, mousePos) {
    this.allObjects().forEach(object => {
      object.move(delta, mousePos);
    });
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (obj1.isCollidedWith(obj2)) {
          const collision = obj1.collideWith(obj2);
          if (collision) return;
        }
      }
    }
  }

  step(delta, mousePos) {
    this.moveObjects(delta, mousePos);
    this.checkCollisions();
  }

  reset() {
    this.ships = [];
    this.enemies = [];
    this.level = 1;
    this.addShip();
  }
}

Game.DIM_X = 1000;
Game.DIM_Y = 800;

module.exports = Game;
