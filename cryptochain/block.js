const { GENESIS_DATA } = require('./config');
class Block {
  // Using an object in case block data is not organized by params
  constructor({ timestamp, lastHash, hash, data }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  // Create Genesis Block Factory Method
  static genesis() {
    return new this(GENESIS_DATA);
  }

  // Mine Block Method
  static mineBlock({ lastBlock, data }) {
    return new this({
      timestamp: Date.now(),
      lastHash: lastBlock.hash,
      data
    });
  }

}

module.exports = Block;