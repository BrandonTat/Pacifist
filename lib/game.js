const Ship = require("./ship");
const Enemy = require("./enemy");
const Bomb = require("./bomb");
const Util = require("./util");

class Game {
  constructor(stage) {
    this.stage = stage;
    this.over = true;
    this.level = 1;
    this.ships = [];
    this.enemies = [];
    this.bombs = [];
    this.score = 0;
    this.addShip();

    setInterval(this.addEnemy.bind(this), 3000);
    setInterval(this.addBombs.bind(this), 4000);

    this.explosion = this.explosion();
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

  remove(object) {
    if (object instanceof Ship) {
      this.ships.splice(this.ships.indexOf(object), 1);
    } else if (object instanceof Enemy) {
      this.enemies.splice(this.enemies.indexOf(object), 1);
    } else if (object instanceof Bomb) {
      this.bombs.splice(this.bombs.indexOf(object), 1);
    }
    this.stage.removeChild(object.bitmap);
  }

  draw() {
    this.allObjects().forEach(object => {
      object.draw(this.stage);
    });
  }

  middlePosition() {
    const midX = Game.DIM_X / 2;
    const midY = Game.DIM_Y / 2;
    return [midX, midY];
  }

  randomEnemyPosition(level) {
    let posX;
    let posY;

    if (level === 0) {
      posX = Util.randomInRange(1, 100);
      posY = Util.randomInRange(1, 100);
    } else if (level === 2) {
      posX = Util.randomInRange(Game.DIM_X - 100, Game.DIM_X);
      posY = Util.randomInRange(1, 100);
    } else if (level === 3) {
      posX = Util.randomInRange(Game.DIM_X - 100, Game.DIM_X);
      posY = Util.randomInRange(Game.DIM_Y - 100, Game.DIM_Y);
    } else {
      posX = Util.randomInRange(1, 100);
      posY = Util.randomInRange(Game.DIM_Y - 100, Game.DIM_Y);
    }

    return [posX, posY];
  }

  randomBombPosition() {
    return [
      Math.random() * (Game.DIM_X - 100),
      Math.random() * (Game.DIM_Y - 100)
    ];
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0 || pos[1] < 0) ||
      (pos[0] > Game.DIM_X || pos[1] > Game.DIM_Y);
  }

  addShip() {
    const ship = new Ship(this.stage, {
      pos: this.middlePosition(),
      game: this
    });

    this.add(ship);
    return ship;
  }

  addEnemy() {
    let numEnemies = this.level * 4;
    if (numEnemies > 40) {
      numEnemies = 40;
    }

    for(let i = 0; i < numEnemies/2; i++) {
      let enemyPosition = this.randomEnemyPosition(this.level % 4);
      this.add(new Enemy(this.stage, { game:this, pos: enemyPosition }));
    }

    for(let i = 0; i < numEnemies/2; i++) {
      let enemyPosition = this.randomEnemyPosition((this.level + 2) % 4);
      this.add(new Enemy(this.stage, { game:this, pos: enemyPosition }));
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
    if (amount < 6) {
      amount = 2;
    }

    for (let i=0; i<amount; i++) {
      let bombPosition = this.randomBombPosition();
      this.add(new Bomb(this.stage, {game: this, pos: bombPosition}));
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
          const collision = obj1.collideWith(obj2, this.stage);
          if (collision) return;
        }
      }
    }
    $('#score1').text(`Score: ${this.score}`);
  }

  step(delta, mousePos) {
    this.moveObjects(delta, mousePos);
    this.checkCollisions();
  }

  reset() {
    this.over = true;
    this.level = 1;
    this.ships = [];
    this.enemies = [];
    this.bombs = [];
    this.score = 0;
    this.addShip();
  }

  explode(bomb) {
    this.removeBlastRadius(bomb);
    this.remove(bomb);
  }

  //Testing explosion
  explosion() {
    var explosion = new createjs.SpriteSheet({
      images: ["./assets/images/explosions.png"],
      frames: {width: 100, height: 100, regX: 25, regY: 25, count: 83},
      animations: {still: [40, 42, "still"], explode: [16, 20, "still", 5]}
    });

    return explosion;
  }

  explodeObj(x, y) {
  let explosion = new createjs.Sprite(this.explosion, "explode");
  explosion.scaleX = .5;
  explosion.scaleY = .5;

  explosion.x = x;
  explosion.y = y;
  this.stage.addChild(explosion);
  setTimeout(() => this.stage.removeChild(explosion), 200);
}

  removeBlastRadius(bomb) {
    this.enemies.forEach( enemy => {
      if (this.inBlastRadius(bomb.pos, enemy.pos)) {
        this.remove(enemy);
        this.score += 1;
      }
    });
  }

  inBlastRadius(pos1, pos2) {
    return (Util.dist(pos1, pos2) <= Game.BLAST_RADIUS);
  }
}

Game.DIM_X = 1000;
Game.DIM_Y = 800;
Game.BLAST_RADIUS = 150;

// Game.DIM_X = canvasEl.width;
// Game.DIM_Y = canvasEl.height;
module.exports = Game;
