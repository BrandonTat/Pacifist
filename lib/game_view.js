class GameView {
  constructor(game, stage) {
    this.game = game;
    this.stage = stage;
    this.ship = this.game.addShip();

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

      this.ship.move(newPosX, newPosY);
      this.stage.update();
    });
  }
}

module.exports = GameView;
