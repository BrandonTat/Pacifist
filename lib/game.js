const Ship = require("./ship");
const Enemy = require("./enemy");
const Bomb = require("./bomb");
const Util = require("./util");
const Particle = require("./particle");

class Game {
  constructor(stage) {
    this.setBounds();
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

    this.particles = [];
  }

  setBounds() {
    let width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    let height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    this.DIM_X = width;
    this.DIM_Y = height;
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
    } else if (object instanceof Particle) {
      this.particles.splice(this.particles.indexOf(object), 1);
    }
    this.stage.removeChild(object.shape);
  }

  draw() {
    this.allObjects().forEach(object => {
      object.draw(this.stage);
    });

    this.particles.forEach((particle) => {
      if (particle.isDead()) {
        this.remove(particle);
      } else {
        particle.draw();
      }
    });
  }

  middlePosition() {
    const midX = this.DIM_X / 2;
    const midY = this.DIM_Y / 2;
    return [midX, midY];
  }

  randomEnemyPosition(level) {
    let posX;
    let posY;

    if (level === 0) {
      posX = Util.randomInRange(1, 150);
      posY = Util.randomInRange(1, 150);

    } else if (level === 2) {
      posX = Util.randomInRange(this.DIM_X - 150, this.DIM_X);
      posY = Util.randomInRange(1, 150);

    } else if (level === 3) {
      posX = Util.randomInRange(this.DIM_X - 150, this.DIM_X);
      posY = Util.randomInRange(this.DIM_Y - 150, this.DIM_Y);

    } else {
      posX = Util.randomInRange(1, 150);
      posY = Util.randomInRange(this.DIM_Y - 150, this.DIM_Y);
    }

    return [posX, posY];
  }

  randomBombPosition() {
    return [
      Math.random() * (this.DIM_X - 100),
      Math.random() * (this.DIM_Y - 100)
    ];
  }

  isOutOfBounds(pos) {
    return (pos[0] < 0 || pos[1] < 0) ||
      (pos[0] > this.DIM_X || pos[1] > this.DIM_Y);
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
    if (!this.over) {
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

    this.particles = [];
  }

  explode(bomb) {
    this.createExplosion(bomb.pos[0], bomb.pos[1], "#ADD8E6");
    this.createExplosion(bomb.pos[0], bomb.pos[1], "#00ced1");
    this.removeBlastRadius(bomb);
    this.remove(bomb);
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

  createExplosion(posX, posY, color) {
    let count = 100;
    let minSpeed = 20;
    let maxSpeed = 40;
    let minSize = .5;
    let maxSize = 1.2;

    for (let angle = 0; angle < 360; angle += Math.round(360/count)) {
      let particle = new Particle(this.stage);
      let size = Util.randomInRange(minSize, maxSize);
      let speed = Util.randomInRange(minSpeed, maxSpeed);
      let velX = speed * Math.cos(angle * Math.PI / 180.0);
      let velY = speed * Math.sin(angle * Math.PI / 180.0);

      particle.radius = size;
      particle.pos = [posX, posY];
      particle.vel = [velX, velY];
      particle.color = color;
      this.particles.push(particle);
    }
  }
}

Game.BLAST_RADIUS = 250;
module.exports = Game;
