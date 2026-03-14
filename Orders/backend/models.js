const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    user_phone: {
        type: String,
        minlength: 10,
        maxlength: 10,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    total_cost: {
        type: Number,
        required: true
    },
    items: {
        type: [String],
        required: true
    }
})

Order = mongoose.model("Order", OrderSchema)
module.exports = Order