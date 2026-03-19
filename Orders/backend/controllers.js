const Order = require("./models")
const validateOrderInput = require("./utils")
const mongoose = require("mongoose")
const { sendOrderEvent } = require('./services/kafka')
const { setCache, getCache , deleteCache } = require("./services/redis")

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

        //makes sense to first chceck cache and then db
        const cachekey = "orders:all";
        const result = await getCache(cachekey)
        if (result){
            return res.status(200).json({
                success: true,
                data: result,
                count: result.length
            })
        }

        const order = await Order.find();
        await setCache(cachekey, order);

        return res.status(200).json({
            success: true,
            count: order.length,
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


module.exports.GetOrderbyIdController = async (req, res) => {
    try {

        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Order ID"
            })
        }
        const cachekey = `order:${id}`
        const result = await getCache(cachekey);
        if (result) {
            return res.status(200).json({
                success: true,
                data: result
            })
        }
        const order = await Order.findById(id)
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        await setCache(cachekey, order)

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