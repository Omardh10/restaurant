const mongoose = require('mongoose');
const joi = require('joi');
const Categschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })
const validatecreatecateg = (obj) => {
    const schema = joi.object({
        name: joi.string().trim().min(2).max(100).required(),
    })
    return schema.validate(obj)
}
const validateupdatecateg = (obj) => {
    const schema = joi.object({
        name: joi.string().trim().min(2).max(100),
    })
    return schema.validate(obj)
}



const Category = mongoose.model('Category', Categschema)
module.exports = { Category, validatecreatecateg, validateupdatecateg };

