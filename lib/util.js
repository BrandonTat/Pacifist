const Util = {
  randomInRange(min, max) {
    return Math.random() * (max-min) + max;
  },

  dir(vec) {
    var norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  },

  dist(pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },

  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  },

  norm(vec) {
    return Util.dist([0, 0], vec);
  },

  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  },

  findVector(pos1, pos2) {
    return [pos2[0] - pos1[0], pos2[1] - pos1[1]];
  }
};

module.exports = Util;
