const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');
class Block {
  // Using an object in case block data is not organized by params
  constructor({ timestamp, lastHash, hash, data, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  // Create Genesis Block Factory Method
  static genesis() {
    return new this(GENESIS_DATA);
  }

  // Mine Block Method
  static mineBlock({ lastBlock, data }) {
    let hash, timestamp;
    // const timestamp = Date.now();
    const lastHash = lastBlock.hash;
    const { difficulty } = lastBlock;
    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();
      hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this({
      timestamp,
      lastHash,
      data,
      difficulty,
      nonce,
      hash
    });
  }

}

module.exports = Block;