/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const Util = {
  randomInRange(min, max) {
    return Math.random() * (max-min) + max;
  },

  dir(vec) {
    var norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  },

  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },

  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

  norm(vec) {
    return Util.dist([0, 0], vec);
  },

  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  findVector(pos1, pos2) {
    return [pos2[0] - pos1[0], pos2[1] - pos1[1]];
  }
};

module.exports = Util;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

class MovingObject {
  constructor(stage, options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.shape = options.shape;
    this.game = options.game;
    this.start = 0;

    stage.addChild(this.shape);
  }

  draw() {
    this.shape.x = this.pos[0];
    this.shape.y = this.pos[1];
  }

  isCollidedWith(otherObject) {
    console.log(this.shape);
    let x = Math.abs(this.shape.x - otherObject.shape.x);
    let y = Math.abs(this.shape.y - otherObject.shape.y);
    let type = (this.shape !== otherObject.shape);
    return (type && x < 30 && y < 30);
  }

  collideWith(otherObject) {}

  remove() {
    this.game.remove(this);
  }
}

module.exports = MovingObject;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);
const Util = __webpack_require__(0);

class Ship extends MovingObject {
  constructor(stage, options) {
    options.shape = new createjs.Shape().set(options.pos);
    options.shape.graphics.s('white').ss(1);
    options.shape.graphics.beginFill('white').arc(0, 0, 18, 0, 6.29).endFill();
    options.vel = options.vel || [0, 0];
    super(stage, options);
  }

  maxAccel(accel) {
    if (accel[0] > 25) {
      accel[0] = 25;
    } else if (accel[0] < -25) {
      accel[0] = -25;
    }

    if (accel[1] > 25) {
      accel[1] = 25;
    } else if (accel[1] < -25) {
      accel[1] = -25;
    }

    return accel;
  }

  move(delta, mousePos) {
    let accel = Util.findVector(this.pos, [mousePos[0] - 50, mousePos[1] -50]);
    let maxAccel = this.maxAccel(accel);
    let newPos = [(this.pos[0] + maxAccel[0]), (this.pos[1] + maxAccel[1])];

    if (this.game.isOutOfBounds(newPos)) {
      if (newPos[0] <= 0 || newPos[0] >= this.game.DIM_X) {
        maxAccel[0] = 0;
      }

      if (newPos[1] <= 0 || newPos[0] >= this.game.DIM_Y) {
        maxAccel[1] = 0;
      }
    }

    this.pos = [(this.pos[0] + maxAccel[0]), (this.pos[1] + maxAccel[1])];
  }
}

module.exports = Ship;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Ship = __webpack_require__(2);
const Enemy = __webpack_require__(6);
const Bomb = __webpack_require__(5);
const Util = __webpack_require__(0);
const Particle = __webpack_require__(8);

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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

class GameView {
  constructor(game, stage) {
    this.stage = stage;
    this.game = game;

    this.beginGame = this.beginGame.bind(this);

    $('#startButton').on('click', (event) => {
      this.game.over = false;
      $('#startModal').css("visibility", "hidden");
      this.beginGame();
    });

    $('#gameOverModal').css("visibility", "hidden");

    $('#playAgain').on('click', (event) => {
      this.game.over = false;
      $('#gameOverModal').css("visibility", "hidden");
    });
  }

  beginGame() {
    createjs.Ticker.setInterval(60);
    createjs.Ticker.on('tick', (event) => {
      if (this.game.over) {
        this.stage.removeAllChildren();
        this.stage.clear();
        this.stage.update();
        this.game.reset();
        return;
      } else {
        let newPosX = this.stage.mouseX;
        let newPosY = this.stage.mouseY;
        let mousePos = [newPosX, newPosY];
        this.game.step(event.delta, mousePos);
        this.game.draw();
        this.stage.update();
      }
    });
  }
}

module.exports = GameView;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);
const Util = __webpack_require__(0);
const Ship = __webpack_require__(2);

class Bomb extends MovingObject {
  constructor(stage, options) {
    options.shape = new createjs.Shape().set(options.pos);
    options.shape.graphics.beginFill('#00E5EE').drawPolyStar(0, 0, 20, 8, .3, -15);
    options.pos = options.pos;
    options.vel = Util.randomVec(1);

    super(stage, options);
  }

  maxVelocity(velX, velY) {
    let newX = velX, newY = velY;
    if (velX > 3) {
      newX = 3;
    } else if (velX < -3) {
      newX = -3;
    }

    if (velY > 3) {
      newY = 3;
    } else if (velY < -3) {
      newY = -3;
    }

    return [newX, newY];
  }

  move(delta, stage) {
    const velocityScale = delta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel[0] * velocityScale,
      offsetY = this.vel[1] * velocityScale;

    let maxVelocity = this.maxVelocity(offsetX, offsetY);
    const oldPos = this.pos;
    this.pos = [this.pos[0] + maxVelocity[0], this.pos[1] + maxVelocity[1]];
    if (this.game.isOutOfBounds(this.pos)) {
      if (this.pos[0] <= 0 || this.pos[0] >= 945) {
        this.vel[0] *= -1;
      }

      if (this.pos[1] <= 0 || this.pos[1] >= 740) {
        this.vel[1] *= -1;
      }
      this.pos = oldPos;
    }
  }

  collideWith(otherObject, stage) {
    if (otherObject instanceof Ship) {
      this.game.explode(this, stage);
      return true;
    }
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = Bomb;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(1);
const Util = __webpack_require__(0);
const Ship = __webpack_require__(2);

class Enemy extends MovingObject {
  constructor(stage, options) {
    options.shape = new createjs.Shape().set(options.pos);
    options.shape.graphics.s('#00ff00').ss(1);
    options.shape.graphics.drawRect(0, 0, 30, 30);
    options.vel = options.vel || [0, 0];
    super(stage, options);
  }

  maxVelocity(velX, velY) {
    let newX = velX, newY = velY;

    if (velX > 5) {
      newX = 5;
    } else if (velX < -5) {
      newX = -5;
    }

    if (velY > 5) {
      newY = 5;
    } else if (velY < -5) {
      newY = -5;
    }

    return [newX, newY];
  }


  move(delta) {
    let shift = Math.floor(Math.random() * 10) + 5;
    this.shape.skewX += shift;
    this.shape.skewY += shift;

    if (this.start < 45) {
      this.start += 1;
      return;
    }

    let impulse = Util.findVector(this.pos, this.game.ships[0].pos);
    let dir = Util.dir(impulse);
    let newVel = [this.vel[0] + dir[0], this.vel[1] + dir[1]];
    let maxVel = this.maxVelocity(newVel[0], newVel[1]);
    this.vel = maxVel;


    this.pos = [this.pos[0] + maxVel[0], this.pos[1] + maxVel[1]];
  }

  collideWith(otherObject) {
    if (otherObject instanceof Ship) {
      this.game.over = true;
      $('#gameOverModal').css('visibility', 'visible');
      $('#score').text(`Score: ${this.game.score}`);
      return true;
    }
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = Enemy;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(3);
const GameView = __webpack_require__(4);

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("myCanvas");

  let stage = new createjs.Stage("myCanvas");
  window.stage = stage;
  const game = new Game(stage);
  new GameView(game, stage);
});


/***/ }),
/* 8 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map