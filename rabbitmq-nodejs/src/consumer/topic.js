const amqplib = require('amqplib');
const config = require('../../cfg/config');

const { handlerConsumer: handler } = require('../handler');
const { startConsumer: start } = require('../queue');

(async () => {

    start({
        handler,
        conn: await amqplib.connect(config.uri),
        exchange: config.exchange[process.env.EXC] || config.exchange.topic,
        param: {
            key: process.env.KEY,
            queue: process.env.QUE,
            exchange: process.env.EXC
        }
    });
})();
