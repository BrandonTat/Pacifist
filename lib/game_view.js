class GameView {
  constructor(game, stage) {
    this.game = game;
    this.stage = stage;
    this.ship = this.game.addShip();

    this.start = this.start.bind(this);
  }

  start() {
    createjs.Ticker.on("tick", () => {
      this.game.draw(this.stage);
    });
    createjs.Ticker.setFPS(60);
  }

  // bindKeyHandlers() {
  //   const ship = this.ship;
  //   Object.keys(GameView.MOVES).forEach((k) => {
  //     let move = GameView.MOVES[k];
  //     key(k, () => { ship.power(move); });
  //   });
  // }
}

GameView.MOVES = {
  "w": [0, -1],
  "a": [-1, 0],
  "s": [0, 1],
  "d": [1, 0]
};

module.exports = GameView;
