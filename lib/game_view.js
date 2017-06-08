class GameView {
  constructor(game, stage) {
    this.game = game;
    this.stage = stage;

    this.start = this.start.bind(this);
    this.beginGame = this.beginGame.bind(this);

    $('#startButton').on('click', (event) => {
      game.over = false;
      $('#startModal').css("visibility", "hidden");
    });

    $('#gameOverModal').css("visibility", "hidden");

    $('#playAgain').on('click', (event) => {
      game.reset();
      game.over = false;
      $('#gameOverModal').css("visibility", "hidden");
    });
  }

  start() {
    this.game.draw(this.stage);
    this.stage.on("stagemousemove", this.beginGame);

  }

  beginGame() {
    createjs.Ticker.setInterval(45);
    createjs.Ticker.on('tick', (event) => {
      if (this.game.over) {
        this.game.reset();
        this.stage.removeAllChildren();
        this.stage.clear();
        this.stage.update(event);
        return;
      } else {
        let newPosX = this.stage.mouseX;
        let newPosY = this.stage.mouseY;
        let mousePos = [newPosX, newPosY];
        this.game.step(event.delta, mousePos, this.stage);
        this.game.draw(this.stage);
        this.stage.update(event);
      }
    });
    // createjs.Ticker.setFPS(60);
  }
}

module.exports = GameView;
