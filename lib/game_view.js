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
