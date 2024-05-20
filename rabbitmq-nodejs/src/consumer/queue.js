async function start({ handler, conn, queue, config }) {
    const channel = await conn.createChannel();
    await channel.assertQueue(queue, config);
    channel.consume(
        queue,
        handler({
            type: 'QUEUE',
            end: (msg) => {
                channel.ack(msg);
            }
        }),
        {
            // noAck: true
        }
    );
}

// -------------------------------------------------------

const amqplib = require('amqplib');
const config = require('../../cfg/config');
const { handlerConsumer: handler } = require('../handler');

(async () => {
    const conn = await amqplib.connect(config.uri);
    start({ handler, conn, queue: config.channel.main.name, config: config.channel.main.cfg });
})();
