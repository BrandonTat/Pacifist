const Game = require("./game");
const GameView = require("./game_view");

//REMOVE AFTER TESTING
const Ship = require("./ship");

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("myCanvas");
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  let stage = new createjs.Stage("myCanvas");

  // let circle = new createjs.Shape();
  // circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
  // circle.x = 100;
  // circle.y = 100;
  // stage.addChild(circle);
  // stage.update();
  //
  // let img = new Image();
  // img.src = "./images/ship.png";
  // img.onload = function(event) {
  //   let bitmap = new createjs.Bitmap(img.src);
  //
  //  stage.addChild(bitmap);
  //  stage.update();
  // };
  const game = new Game();
  new GameView(game, stage).start();
});
