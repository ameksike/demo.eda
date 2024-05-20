const amqplib = require('amqplib');
const config = require('../../cfg/config');

const { handlerConsumer: handler } = require('../handler');
const { startConsumer: start } = require('../queue');

(async () => {
    const conn = await amqplib.connect(config.uri);
    start({ handler, conn, exchange: config.exchange.topic });
})();
