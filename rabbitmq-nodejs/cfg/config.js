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
            queues: [{
                name: "Ex_Qu_FANOUT_1",
                config: { durable: true },
                pattern: ""
            }],
            name: "Ex_Fanout",
            type: "fanout",
            routingKey: ""
        },
        direct: {
            queues: [{
                name: "Ex_Qu_DIRECT_1",
                config: { durable: true },
                pattern: "exact1"
            }, {
                name: "Ex_Qu_DIRECT_2",
                config: { durable: true },
                pattern: "exact2"
            }],
            name: "Ex_Direct",
            type: "direct",
            routingKey: "exact1"
        },
        topic: {
            queues: [{
                name: "Ex_Qu_TOPIC_1",
                config: { durable: true },
                pattern: "exact1"
            }, {
                name: "Ex_Qu_TOPIC_2",
                config: { durable: true },
                pattern: "exact2"
            }],
            name: "Ex_Topic",
            type: "topic",
            routingKey: "exact2"
        }
    }
}