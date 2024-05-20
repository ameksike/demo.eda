module.exports = {
    uri: 'amqp://localhost',
    channel: {
        main: {
            name: "main",
            cfg: {
                durable: true // persist on restart
            }
        }
    },
    exchange: {
        fanout: {
            queue: {
                name: "QU_FANOUT_1",
                config: { durable: true },
                pattern: ""
            },
            name: "EX_FANOUT",
            type: "fanout",
            routingKey: ""
        },
        direct: {
            queue: {
                name: "QU_DIRECT_1",
                config: { durable: true },
                pattern: "direct.data"
            },
            name: "EX_DIRECT",
            type: "direct",
            routingKey: "direct.data"
        },
        topic: {
            queue: {
                name: "QU_TOPIC_1",
                config: { durable: true },
                pattern: "topic.*"
            },
            name: "EX_TOPIC",
            type: "topic",
            routingKey: "topic.data.1"
        }
    }
}