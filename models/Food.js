const mongoose = require('mongoose');
const joi = require('joi');
const Foodschema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: Object,
        default: {
            url: "",
            publicId: null
        }
    },
    description: {
        type: String,
        required: true
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    category:{
        type:String,
        required:true
    },
    rating: {
        type: Number,
        default: 1
    }
}, { timestamps: true })
const validatecreatefood = (obj) => {
    const schema = joi.object({
        title: joi.string().required(),
        restaurant: joi.string().required(),
        price: joi.number().required(),
        description: joi.string().required(),
        rating:joi.number(),
        categoryId:joi.string().required()
    })
    return schema.validate(obj)
}
const validateupdatefood = (obj) => {
    const schema = joi.object({
        title: joi.string(),
        restaurant: joi.string(),
        price: joi.number(),
        description: joi.string(),
        rating: joi.number(),
        categoryId:joi.string()
    })
    return schema.validate(obj)
}

const Food = mongoose.model('Food', Foodschema)
module.exports = { Food, validatecreatefood, validateupdatefood };

