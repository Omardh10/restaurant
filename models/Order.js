const mongoose = require('mongoose');
const joi = require('joi');
const Orderschema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        trim: true,
    },
    foods: [
        {
            food: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Food'
            },
             quantity: {
                type: Number,
                required: true
            }
        }
    ],
    phone: {
        type: String,
        trim: true,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        default:"pending"
    }

}, { timestamps: true })
const validatecreateorder = (obj) => {
    const schema = joi.object({
        address: joi.string().trim().required(),
        foods: joi.array().required(),
        phone: joi.string().trim().required(),
    })
    return schema.validate(obj)
}
const validateupdateorder = (obj) => {
    const schema = joi.object({
        address: joi.string().trim(),
        foods: joi.array(),
        phone: joi.string().trim(),
        status: joi.string().trim()
    })
    return schema.validate(obj)
}


const Order = mongoose.model('Order', Orderschema)
module.exports = { Order, validatecreateorder, validateupdateorder };

