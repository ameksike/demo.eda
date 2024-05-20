
## Run Producers
- npm run producer:queue
- npm run producer:fanout
- npm run producer:topic
- set KEY=topic.data.1 && npm run producer:topic

## Run Consumers
- npm run consumer:queue
- npm run consumer:fanout
- npm run consumer:topic
- set KEY=topic.* && set QUE=QU_TOPIC_2 && npm run consumer:topic


### Notes
- Fanout: producer routing key and consumer pattern are empty
- Direct: producer routing key must be the same as consumer pattern 

- The load is shared between consumers in the same queue
- Consumers from different queues from the same exchange receive a broadcast message