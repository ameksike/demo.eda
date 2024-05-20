const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'] // Cambia esto a la dirección de tu broker Kafka
});

const consumer = kafka.consumer({ groupId: 'test-group' });

const run = async () => {
  // Conectar el consumidor
  await consumer.connect();
  
  // Suscribirse al topic
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });

  // Consumir mensajes
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
    },
  });
};

run().catch(console.error);
