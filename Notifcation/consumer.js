const { Kafka } = require("kafkajs")

const kafka = new Kafka({
    clientId: "notification-service",
    brokers: ["localhost:9092"]
})

const consumer = kafka.consumer({
    groupId: "order-notification-group"
})

const run = async () => {

    await consumer.connect()
    console.log("Notification consumer connected")

    await consumer.subscribe({
        topic: "orders",
        fromBeginning: true
    })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {

            const order = JSON.parse(message.value.toString())

            console.log("New Order Event Received")
            console.log(order)

        }
    })
}

run().catch(console.error)