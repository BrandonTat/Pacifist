// const Game = require("./game");
// const GameView = require("./game_view");
//
// document.addEventListener("DOMContentLoaded", function(){
//   const canvasEl = document.getElementById("myCanvas");
//   canvasEl.width = Game.DIM_X;
//   canvasEl.height = Game.DIM_Y;
//
//   let stage = new createjs.Stage("myCanvas");
//   const game = new Game(stage);
//   new GameView(game, stage);
// });

const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("myCanvas");

  let stage = new createjs.Stage("myCanvas");
  window.stage = stage;
  const game = new Game(stage);
  new GameView(game, stage);
});

window.addEventListener('resize', () => {
  game.setBounds();
});
