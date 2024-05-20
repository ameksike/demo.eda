
/**
 * @description Example of Consumer handler
 * @param {String} msg 
 */
function handlerConsumer({ end, type }) {
    return (msg) => {
        try {
            if (msg !== null) {
                let res = JSON.parse(msg.content.toString());
                let i = 1e9;
                while (i--) { }
                end instanceof Function && end(msg);
                console.log('CONSUMER :>>>: ', type, ' :>>>: ', res.index, res.message, res.type);
            } else {
                console.log('CONSUMER :>>>: ', 'Cancelled by server');
            }
        }
        catch (error) {
            console.log('CONSUMER :>>>: Error: ', error.message);
        }
    }

}

/**
 * @description Example of Producer handler
 * @param {Number} time 
 * @returns {Promise<{ index:Number; message:String; time:Number }>}
 */
function handlerProducer({ time = 1000, index = 0, send, type }) {
    setInterval(() => {
        const obj = {
            type,
            index: ++index,
            message: Math.random().toString(32).slice(2, 6),
            time: Math.random() * 1000000 + 100
        };
        let res = send instanceof Function && send(obj);
        console.log('PRODUCER :<<<: ', obj.type, ' :<<<: ', res, obj.index, obj.message);
    }, time);
}

module.exports = {
    handlerConsumer,
    handlerProducer
}