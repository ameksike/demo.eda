async function startConsumer({ conn, exchange, handler, param }) {
    const queueName = param?.queue || exchange.queue.name;
    const queueConf = exchange.queue.config || { durable: true };
    const queueKey = param?.key || exchange?.queue?.pattern || "";

    const channel = await conn.createChannel();
    await channel.assertQueue(queueName, queueConf);
    await channel.bindQueue(queueName, exchange.name, queueKey);

    console.log("CONSUMER:START:", queueName, exchange.name, queueKey, exchange.type);

    channel.consume(
        queueName,
        handler({
            type: exchange.type.toUpperCase(),
            end: (msg) => {
                channel.ack(msg);
            }
        })
    );
}

async function startProducer({ handler, conn, exchange, param }) {
    const channel = await conn.createChannel();
    const pattern = param?.key || exchange.routingKey;
    await channel.assertExchange(exchange.name, exchange.type);

    console.log("PRODUCER:START:", exchange.name, exchange.type, pattern);

    handler({
        type: exchange.type.toUpperCase(),
        send: (obj) => channel.publish(
            exchange.name,
            pattern,
            Buffer.from(typeof obj === "string" ? obj : JSON.stringify(obj)),
            { persistent: true }
        )
    });
}

module.exports = {
    startConsumer,
    startProducer
}