const Order = require("./models")
const validateOrderInput = require("./utils")
const mongoose = require("mongoose")
const { sendOrderEvent } = require('./kafka')

module.exports.PostOrderController = async (req, res) => {
    try {

        const err = validateOrderInput(req.body)

        if (err) {
            return res.status(400).json({
                success: false,
                message: err.details[0].message
            })
        }

        const order = new Order(req.body)
        const savedOrder = await order.save()

        await sendOrderEvent(savedOrder)

        return res.status(201).json({
            success: true,
            data: savedOrder
        })

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message
        })

    }
}


module.exports.GetallOrderController = async (req, res) => {
    try {

        const orders = await Order.find()

        return res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        })

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message
        })

    }
}


module.exports.GetOrderbyIdController = async (req, res) => {
    try {

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Order ID"
            })
        }

        const order = await Order.findById(id)

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: order
        })

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: err.message
        })

    }
}