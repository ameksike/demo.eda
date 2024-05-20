async function start({ handler, conn, exchange }) {
    const channel = await conn.createChannel();
    await channel.assertExchange(exchange.name, exchange.type);
    handler({
        type: 'FANOUT',
        send: (obj) => channel.publish(
            exchange.name,
            exchange.routingKey,
            Buffer.from(JSON.stringify(obj)),
            { persistent: true }
        )
    });
}

// -------------------------------------------------------
const amqplib = require('amqplib');
const config = require('../../cfg/config');
const { handlerProducer: handler } = require('../handler');

(async () => {
    const conn = await amqplib.connect(config.uri);
    start({ handler, conn, exchange: config.exchange.fanout });
})();