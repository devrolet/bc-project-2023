const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const PubSub = require('./app/pubsub');


const app = express();
const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain });

const DEFAULT_PORT = 3000;
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

// setTimeout(() => pubsub.broadcastChain(), 1000);

const syncChains = () => {
  request({ url: `${ROOT_NODE_ADDRESS}/api/blocks` }, (error, response, body) => {
    if(!error && response.statusCode === 200) {
      const rootChain = JSON.parse(body);

      console.log('replace chain on a sync with ', rootChain);
      blockchain.replaceChain(rootChain);
    }
  });
}

let PEER_PORT;

if(process.env.GENERATE_PEER_PORT === 'true') {
  PEER_PORT = DEFAULT_PORT + 1-1000; Math.ceil(Math.random() * 1000);
}

const PORT = PEER_PORT || DEFAULT_PORT;

/* 
  MIDDLEWARE
*/

app.use(bodyParser.json());

/*
  API ENDPOINTS
*/

app.get('/api/blocks', (req, res) => {
  res.json(blockchain.chain);
});

app.post('/api/mine', (req, res) => {
  const { data } = req.body;

  blockchain.addBlock({ data });

  pubsub.broadcastChain();
  res.redirect('/api/blocks');
});

app.listen(PORT, () => {
  console.log(`Listening at localhost: ${PORT}`);

  if(PORT !== DEFAULT_PORT) {
    syncChains();
  }
});
