const amqplib = require('amqplib');
const config = require('../../cfg/config');

const { handlerProducer: handler } = require('../handler');
const { startProducer: start } = require('../queue');

(async () => {
    const conn = await amqplib.connect(config.uri);
    start({ handler, conn, exchange: config.exchange.topic });
})();