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
            key: process.env.KEY?.trim(),
            queue: process.env.QUE?.trim(),
            exchange: process.env.EXC?.trim()
        }
    });
})();
