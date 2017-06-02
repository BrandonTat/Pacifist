class GameView {
  constructor(game, stage) {
    this.game = game;
    this.stage = stage;

    this.start = this.start.bind(this);
    this.beginGame = this.beginGame.bind(this);
    $('#startButton').on('click', (event) => {
      game.over = false;
    });
  }


  start() {
    this.game.draw(this.stage);
    this.stage.on("stagemousemove", this.beginGame);

  }

//   beginGame() {
//     setInterval(() => {
//       if (!this.game.over) {
//         let newPosX = this.stage.mouseX;
//         let newPosY = this.stage.mouseY;
//         let mousePos = [newPosX, newPosY];
//         this.game.step(1000, mousePos);
//         this.game.draw(this.stage);
//         this.stage.update();
//       } else {
//         this.game.reset();
//         this.stage.removeAllChildren();
//         this.stage.clear();
//
//       }
//     }, 1000);
//   }
// }

  beginGame() {
    createjs.Ticker.addEventListener('tick', (event) => {
      let newPosX = this.stage.mouseX;
      let newPosY = this.stage.mouseY;
      let mousePos = [newPosX, newPosY];
      this.game.step(event.delta, mousePos);
      this.game.draw(this.stage);
      this.stage.update();
    })
    createjs.Ticker.setFPS(60);
  }
}

module.exports = GameView;
