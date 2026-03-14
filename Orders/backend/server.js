const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()
const orderrouter = require("./routes")
const { connectProducer } = require("./kafka")
const app = express()

app.use(express.json())
app.use("/orders", orderrouter)


mongoose.connect(process.env.MONGO_URI)
.then(async () => {
    console.log("Connected to MongoDB successfully")
    await connectProducer()

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Backend listening on port ${process.env.PORT || 3000}`)
    })
})
.catch((err) => {
    console.error("Error connecting to MongoDB! Backend not started", err)
})