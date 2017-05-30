class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.ship = this.game.addShip();

    this.start = this.start.bind(this);
  }

  start() {
    this.bindKeyHandlers();
    setInterval(this.game.draw(this.ctx), 10);
  }

  bindKeyHandlers() {
    const ship = this.ship;
    Object.keys(GameView.MOVES).forEach((k) => {
      let move = GameView.MOVES[k];
      key(k, () => { ship.power(move); });
    });
  }
}

GameView.MOVES = {
  "w": [0, -1],
  "a": [-1, 0],
  "s": [0, 1],
  "d": [1, 0]
};

module.exports = GameView;
