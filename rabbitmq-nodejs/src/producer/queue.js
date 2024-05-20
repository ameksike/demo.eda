async function start({ handler, conn, queue, config }) {
    const channel = await conn.createChannel();
    await channel.assertQueue(queue, config);
    handler({
        type: 'QUEUE',
        send: (obj) => channel.sendToQueue(queue, Buffer.from(JSON.stringify(obj)), { persistent: true })
    });
}

// -------------------------------------------------------
const amqplib = require('amqplib');
const config = require('../../cfg/config');
const { handlerProducer: handler } = require('../handler');

(async () => {
    const conn = await amqplib.connect(config.uri);
    start({ handler, conn, queue: config.channel.main.name, config: config.channel.main.cfg });
})();