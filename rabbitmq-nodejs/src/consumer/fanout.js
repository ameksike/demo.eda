async function start({ conn, exchange, handler }) {
    const channel = await conn.createChannel();
    for (let queue of exchange.queues) {
        if (queue?.name) {
            await channel.assertQueue(queue.name, queue.config);
            await channel.bindQueue(queue.name, exchange.name, queue.pattern);
            channel.consume(
                queue.name,
                handler({
                    type: 'FANOUT',
                    end: (msg) => {
                        channel.ack(msg);
                    }
                })
            );
        }
    }
}

// -------------------------------------------------------

const amqplib = require('amqplib');
const config = require('../../cfg/config');
const { handlerConsumer: handler } = require('../handler');

(async () => {
    const conn = await amqplib.connect(config.uri);
    start({ handler, conn, exchange: config.exchange.fanout });
})();
