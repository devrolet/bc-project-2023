const PubNub = require('pubnub');

const credentials = {
  publishKey: 'pub-c-8c031eea-244f-41a8-a4ba-b61df89a58ad',
  subscribeKey: 'sub-c-df6d929c-4f94-48a3-a5dc-d1cdeb686de1',
  secretKey: 'sec-c-ODc4NzUzMjUtMzU0Yy00OWRlLTk5YjMtOWYzMDkwNTgxY2Jl'
};

const CHANNELS = {
  TEST: 'TEST',
  TESTTWO: 'TESTTWO'
}

class PubSub {
  constructor() {
    this.pubnub = new PubNub(credentials);

    this.pubnub.subscribe({ channels: Object.values(CHANNELS) });

    this.pubnub.addListener(this.listener());
  }
  
  listener() {
    return {
        message: messageObject => {
          const { channel, message } = messageObject;

          console.log(`Message received. Channel: ${channel}. Message: ${message}`);
        }
    }
  }

  publish({ channel, message }) {
    this.pubnub.publish({ channel, message });
  }
}

module.exports = PubSub;