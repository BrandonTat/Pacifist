const Ship = require("./ship");
const Enemy = require("./enemy");
const Bomb = require("./bomb");
const Util = require("./util");

class Game {
  constructor() {
    this.over = true;
    this.level = 1;
    this.ships = [];
    this.enemies = [];
    this.bombs = [];
    this.score = 0;
    this.addShip();

    setInterval(this.addEnemy.bind(this), 2000);
    setInterval(this.addBombs.bind(this), 3000);
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
      this.bombs.push(object);
    }
  }

  remove(object, stage) {
    if (object instanceof Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else if (object instanceof Enemy) {
      this.enemies.splice(this.enemies.indexOf(object), 1);
    } else if (object instanceof Bomb) {
      this.bombs.splice(this.bombs.indexOf(object), 1);
    }
    stage.removeChild(object.bitmap);
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

  randomEnemyPosition(level) {
    let sectionX = Game.DIM_X / 10;
    let sectionY = Game.DIM_Y / 10;

    let posX = 0;
    let posY = 0;

    if (level === 0) {
      posX = Util.randomInRange(1, sectionX);
      posY = Util.randomInRange(1, sectionY);
    } else if (level === 2) {
      posX = Util.randomInRange(Game.DIM_X - sectionX, Game.DIM_X);
      posY = Util.randomInRange(1, sectionY);
    } else if (level === 3) {
      posX = Util.randomInRange(Game.DIM_X - sectionX, Game.DIM_X);
      posY = Util.randomInRange(Game.DIM_Y - sectionY, Game.DIM_Y);
    } else {
      posX = Util.randomInRange(1, sectionX);
      posY = Util.randomInRange(Game.DIM_Y - sectionY, Game.DIM_Y);
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
    let numEnemies = this.level * 5;
    if (numEnemies > 15) {
      numEnemies = Math.ceil(Math.random() * 15);
    }

    for(let i = 0; i < numEnemies/2; i++) {
      let enemyPosition = this.randomEnemyPosition(this.level % 4);
      this.add(new Enemy({ game:this, pos: enemyPosition }));
    }

    if (this.level < 5) {
      this.level += 1;
    }
  }

  addBombs() {
    if (this.bombs.length > 4) {
      return;
    }
    let amount = this.bombs.length / 2;
    if (amount < 5) {
      amount = 2;
    }

    for (let i=0; i<amount; i++) {
      let bombPosition = this.randomBombPosition();
      this.add(new Bomb({game: this, pos: bombPosition}));
    }
  }

  moveObjects(delta, mousePos) {
    this.allObjects().forEach(object => {
      object.move(delta, mousePos);
    });
  }

  checkCollisions(stage) {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];

        if (obj1.isCollidedWith(obj2)) {
          const collision = obj1.collideWith(obj2, stage);
          if (collision) return;
        }
      }
    }
  }

  step(delta, mousePos, stage) {
    this.moveObjects(delta, mousePos);
    this.checkCollisions(stage);
  }

  reset() {
    this.over = true;
    this.level = 1;
    this.ships = [];
    this.enemies = [];
    this.score = 0;
    this.addShip();

    // setInterval(this.addEnemy.bind(this), 2000);
    // setInterval(this.addBombs.bind(this), 3000);
  }

  explode(bomb, stage) {
    this.removeBlastRadius(bomb, stage);
    this.remove(bomb, stage);
  }

  removeBlastRadius(bomb, stage) {
    this.enemies.forEach( enemy => {
      if (this.inBlastRadius(bomb.pos, enemy.pos)) {
        this.remove(enemy, stage);
        this.score += 1;
      }
    });
  }

  inBlastRadius(pos1, pos2) {
    return (Util.dist(pos1, pos2) <= Game.BLAST_RADIUS);
  }
}

Game.DIM_X = 950;
Game.DIM_Y = 750;
Game.BLAST_RADIUS = 150;

module.exports = Game;
