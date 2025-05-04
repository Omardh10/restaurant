const mongoose = require('mongoose');
const joi = require('joi');
const Restschema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    foods: {
        type: Array,
        required: true
    },
    opening_date: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 1
    },
    delivery: {
        type: Boolean,
        default: true
    },
}, { timestamps: true })
const validatecreateres = (obj) => {
    const schema = joi.object({
        title: joi.string().required(),
        foods: joi.array().required(),
        opening_date: joi.string().required(),
        phonenumber: joi.string().required(),
        city: joi.string().required(),
        rating: joi.number().required()
    })
    return schema.validate(obj)
}
const validateupdateres = (obj) => {
    const schema = joi.object({
        title: joi.string(),
        foods: joi.Array(),
        opening_date: joi.string(),
        phonenumber: joi.string(),
        city: joi.string(),
        delevery: joi.bool(),
        rating: joi.number(),
    })
    return schema.validate(obj)
}

const Restaurant = mongoose.model('Restaurant', Restschema)
module.exports = { Restaurant, validatecreateres, validateupdateres };

