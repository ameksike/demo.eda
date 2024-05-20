async function startConsumer({ conn, exchange, handler }) {
    const channel = await conn.createChannel();
    for (let queue of exchange.queues) {
        if (queue?.name) {
            await channel.assertQueue(queue.name, queue.config);
            await channel.bindQueue(queue.name, exchange.name, queue.pattern);
            channel.consume(
                queue.name,
                handler({
                    type: exchange.type.toUpperCase(),
                    end: (msg) => {
                        channel.ack(msg);
                    }
                })
            );
        }
    }
}

async function startProducer({ handler, conn, exchange }) {
    const channel = await conn.createChannel();
    await channel.assertExchange(exchange.name, exchange.type);
    handler({
        type: exchange.type.toUpperCase(),
        send: (obj) => channel.publish(
            exchange.name,
            exchange.routingKey,
            Buffer.from(typeof obj === "string" ? obj : JSON.stringify(obj)),
            { persistent: true }
        )
    });
}

module.exports = {
    startConsumer,
    startProducer
}