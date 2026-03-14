const Joi = require("joi")

const orderSchema = Joi.object({
    user_name: Joi.string().required(),
    user_phone: Joi.string().length(10).required(),
    user_email: Joi.string().email().required(),
    total_cost: Joi.number().required(),
    items: Joi.array().items(Joi.string()).required()
})

const validateOrderInput = (order) => {
    const { error } = orderSchema.validate(order)
    return error
}

module.exports = validateOrderInput