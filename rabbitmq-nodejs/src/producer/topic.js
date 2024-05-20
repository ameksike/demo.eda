const amqplib = require('amqplib');
const config = require('../../cfg/config');

const { handlerProducer: handler } = require('../handler');
const { startProducer: start } = require('../queue');

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