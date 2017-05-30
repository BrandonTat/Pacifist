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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(4);

class Ship extends MovingObject {
  constructor(options) {
    options.bitmap = new createjs.Bitmap("./images/ship.png");
    options.vel = options.vel || [0, 0];
    options.color = options.color || "#FFD700";
    super(options);

    this.scale();
  }

  scale() {
    this.bitmap.scaleX = .3;
    this.bitmap.scaleY = .3;
  }

  move(posX, posY) {
    this.bitmap.x = posX;
    this.bitmap.y = posY;
  }
}

module.exports = Ship;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Ship = __webpack_require__(0);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class GameView {
  constructor(game, stage) {
    this.game = game;
    this.stage = stage;
    this.ship = this.game.addShip();

    this.start = this.start.bind(this);
  }

  start() {
    this.game.draw(this.stage);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.on("tick", () => {
      let newPosX = this.stage.mouseX;
      let newPosY = this.stage.mouseY;

      this.ship.move(newPosX, newPosY);
      this.stage.update();
    });
  }
}

module.exports = GameView;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);
const GameView = __webpack_require__(2);

//REMOVE AFTER TESTING
const Ship = __webpack_require__(0);

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("myCanvas");
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  let stage = new createjs.Stage("myCanvas");
  const game = new Game();
  new GameView(game, stage).start();
});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(5);

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.bitmap = options.bitmap;
    this.color = options.color;
  }

  draw(stage) {
    this.bitmap.x = this.pos[0];
    this.bitmap.y = this.pos[1];
    stage.addChild(this.bitmap);
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.vel[0] * velocityScale,
      offsetY = this.vel[1] * velocityScale;

    this.pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
  }
}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

module.exports = MovingObject;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

const Util = {

};

module.exports = Util;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map