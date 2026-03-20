const { Kafka } = require("kafkajs")

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: ["localhost:9092"]
})

const consumer = kafka.consumer({
  groupId: "order-notification-group"
})

const run = async () => {
  try {
    await consumer.connect()
    console.log("Notification consumer connected")

    await consumer.subscribe({
      topic: "orders",
      fromBeginning: true
    })

    await consumer.run({
      eachMessage: async ({ message }) => {
        try {
          const order = JSON.parse(message.value.toString())
          console.log("New Order Event Received")
          console.log(order)
        } catch (err) {
          console.error("Message processing failed:", err)
        }
      }
    })

  } catch (err) {
    console.error("Consumer failed:", err)
  }
}

const shutdown = async () => {
  console.log("\nShutting down consumer...")
  try {
    await consumer.disconnect()
    console.log("Consumer disconnected")
    process.exit(0)
  } catch (err) {
    console.error("Shutdown error:", err)
    process.exit(1)
  }
}

process.on("SIGINT", shutdown)

run()