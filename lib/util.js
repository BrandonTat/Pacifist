const Util = {
  randomInRange(min, max) {
    return Math.random() * (max-min) + max;
  }
};

module.exports = Util;
