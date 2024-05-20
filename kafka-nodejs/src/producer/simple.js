const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'] // Cambia esto a la dirección de tu broker Kafka
});

const producer = kafka.producer();

const run = async () => {
  // Conectar el productor
  await producer.connect();
  
  // Enviar un mensaje
  await producer.send({
    topic: 'test-topic',
    messages: [
      { value: 'Hello KafkaJS user!' },
    ],
  });

  // Desconectar el productor
  await producer.disconnect();
};

run().catch(console.error);
