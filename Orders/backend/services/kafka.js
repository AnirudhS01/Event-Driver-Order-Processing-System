const { Kafka } = require("kafkajs")

const kafka = new Kafka({
    clientId: "order-service",
    brokers: ["localhost:9092"]
})
// unlike python where we do producer = Producer(config) , its different in node

const producer = kafka.producer()

// in python , kafka producer implicitly connects to brokers , here we have to eastablish connection explicity
const connectProducer = async () => {
    await producer.connect()
    console.log("kafka producer connected")
}

const sendOrderEvent = async (order) => {

    const result = await producer.send({
        topic: "orders",
        messages: [
            { value: JSON.stringify(order) }
        ]
    })

    deliveryReport("orders", order)

    return result
}

// does not have a callback function like in python so this is a type of work around
const deliveryReport = (topic, message) => {
    console.log("Kafka delivery successful")
    console.log(`Topic: ${topic}`)
    console.log(`Message: ${JSON.stringify(message)}`)
}
// same logic where i learnt dict-json-bytes , here javascript object(order)-json and internal converting to bytes
module.exports = { connectProducer, sendOrderEvent, deliveryReport}