const express = require('express');
const router = express.Router();
const asynchandler = require('express-async-handler');
const { validatecreateres, Restaurant } = require('../models/Restaurant');

router.get('/', asynchandler(async (req, res) => {
    const restaurants = await Restaurant.find();
    res.status(200).json({ status: "success", restaurants });
}))

router.get('/:id', asynchandler(async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
        return res.status(404).json({ message: "this restaurant not found" });
    } else {
        res.status(200).json({ status: "success", restaurant });
    }

}))

router.post('/', asynchandler(async (req, res) => {
    const { error } = validatecreateres(req.body);
    if (error) {
        return res.status(404).json({ message: error.details[0].message })
    }
    let newrestaurant = await new Restaurant({
        title: req.body.title,
        foods: req.body.foods,
        opening_date: req.body.opening_date,
        phonenumber: req.body.phonenumber,
        city: req.body.city,
        rating: req.body.rating
    })
    newrestaurant.save();
    res.status(201).json({ status: "success", newrestaurant });
}))

router.patch('/:id', asynchandler(async (req, res) => {
    let restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
        return res.status(404).json({ message: "this restaurant not found" });
    } else {
        restaurant = await Restaurant.findByIdAndUpdate({ _id: req.params.id }, { $set: { ...req.body } }, { new: true })
        res.status(200).json({ status: "success", restaurant });
    }

}))

router.delete('/:id', asynchandler(async (req, res) => {
    let restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
        return res.status(404).json({ message: "this restaurant not found" });
    } else {
        restaurant = await Restaurant.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ status: "success", message: "deleted successfully" });
    }

}))








module.exports = router;