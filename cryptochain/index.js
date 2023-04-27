const express = require('express');
const Blockchain = require('./blockchain');

const app = express();
const blockchain = new Blockchain();
const PORT = 3000;

app.get('/api/blocks', (req, res) => {
  res.json(blockchain.chain);
});

app.listen(PORT, () => console.log(`Listening at localhost: ${PORT}`));