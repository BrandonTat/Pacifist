class GameView {
  constructor(game, stage) {
    this.game = game;
    this.stage = stage;

    this.start = this.start.bind(this);
    this.beginGame = this.beginGame.bind(this);
  }

  start() {
    this.game.draw(this.stage);
    this.stage.on("stagemousemove", this.beginGame);

  }

  beginGame() {
    createjs.Ticker.setFPS(60);
    createjs.Ticker.on("tick", () => {
      let newPosX = this.stage.mouseX;
      let newPosY = this.stage.mouseY;
      let mousePos = [newPosX, newPosY];
      this.game.step(60, mousePos);
      this.game.draw(this.stage);
    });
  }
}

module.exports = GameView;
