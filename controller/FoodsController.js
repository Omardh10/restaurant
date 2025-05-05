const asynchandler = require('express-async-handler');
const { validatecreatefood, Food, validateupdatefood } = require('../models/Food');
const fs = require('fs');
const path = require('path');
const { UploadImage, RemoveImage } = require('../utils/cloudinary');
const { Category } = require('../models/Category');

const NewFood = asynchandler(async (req, res) => {

    if (!req.file) {
        res.status(404).json({ message: "no file provided" })
    }
    const { error } = validatecreatefood(req.body);
    if (error) {
        return res.status(404).json({ message: error.details[0].message })
    }
    const pathimg = path.join(__dirname, `../images/${req.file.filename}`)
    const result = await UploadImage(pathimg);
    const getcategory = await Category.findById(req.body.categoryId);
    let newfood = new Food({
        title: req.body.title,
        restaurant: req.body.restaurant,
        price: req.body.price,
        image: {
            url: result.secure_url,
            publicId: result.public_id
        },
        description: req.body.description,
        rating: req.body.rating,
        categoryId: req.body.categoryId,
        category: getcategory.name
    })
    newfood.save();
    res.status(201).json({ status: "success", newfood });
    fs.unlinkSync(pathimg);
})

const UpdateFood = asynchandler(async (req, res) => {

    const { error } = validateupdatefood(req.body);
    if (error) {
        return res.status(404).json({ message: error.details[0].message })
    }
    const food = await Food.findById(req.params.id);
    if (!food) {
        return res.status(404).json({ message: "food not found ... " })
    }
    food = await Food.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            title: req.body.title,
            restaurant: req.body.restaurant,
            price: req.body.price,
            description: req.body.description,
            rating: req.body.rating
        }
    }, { new: true })
    res.status(202).json({ status: "success", food })
})

const UpdateImageFood=asynchandler(async(req,res)=>{

    let food = await Food.findById(req.params.id);
    if (!food) {
        return res.status(404).json({ message: "food not found ... " })
    }
    await RemoveImage(food.image.publicId);
    const pathimg = path.join(__dirname, `../images/${req.file.filename}`)
    const result = await UploadImage(pathimg);
    food = await Food.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            image: {
                url: result.secure_url,
                publicId: result.public_id
            }
        }
    }, { new: true })
    res.status(202).json({ status: "success", food })
    fs.unlinkSync(pathimg);
})

const DeleteFood = asynchandler(async (req, res) => {

    const food = await Food.findById(req.params.id);
    if (!food) {
        return res.status(404).json({ message: "food not found ..." })
    } else {
        await Food.findByIdAndDelete({ _id: req.params.id })
        await RemoveImage(food.image.publicId);
        res.status(200).json({ status: "success", message: "deleted successfully" })
    }
})

const GetFoods = asynchandler(async (req, res) => {

    const query = req.query;
    const page = query.page || 1
    const limit = query.limit || 2
    const skip = (page - 1) * limit
    const category = query.category
    let foods;
    if (page) {
        foods = await Food.find().limit(limit).skip(skip).populate("restaurant", ["_id", "title", "foods"])
        res.status(200).json({ status: "success", foods })
    }
    if (category) {
        foods = await Food.find({ category }).populate("restaurant", ["_id", "title", "foods"]);
        res.status(200).json({ status: "success", foods })
    } else {
        foods = await Food.find().populate("restaurant", ["_id", "title", "foods"]);
        res.status(200).json({ status: "success", foods })
    }
})

const GetSingleFood = asynchandler(async (req, res) => {

    const food = await Food.findById(req.params.id).populate("restaurant");
    if (!food) {
        return res.status(404).json({ message: "food not found ..." })
    }
    res.status(200).json({ status: "success", food })
})


module.exports={
    GetFoods,
    GetSingleFood,
    UpdateFood,
    UpdateImageFood,
    NewFood,
    DeleteFood
}