
## Docker run
- docker run -d --hostname my-rabbit --name some-rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management


## Run Producers
- npm run producer:queue
- npm run producer:fanout
- npm run producer:topic
- set KEY=topic.data.1 && npm run producer:topic

## Run Consumers
- npm run consumer:queue
- npm run consumer:fanout
- npm run consumer:topic
- set KEY=topic.2.* && set QUE=QU_TOPIC_2 && npm run consumer:topic
- set KEY=topic.1.* && set QUE=QU_TOPIC_1 && npm run consumer:topic


### Notes
- Fanout: producer routing key and consumer pattern are empty
- Direct: producer routing key must be the same as consumer pattern 

- The load is shared between consumers in the same queue
- Consumers from different queues from the same exchange receive a broadcast message