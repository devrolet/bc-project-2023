class Block {
  constructor({ timestamp, lastHash, hash, data }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }
}

const block1 = new Block({
  timestamp: '12/12/12',
  lastHash: 'bar-lastHash',
  hash: 'bar-hash',
  data: 'bar-data'
});

console.log('block1', block1);