const asynchandler = require('express-async-handler');
const { validatecreateres, Restaurant } = require('../models/Restaurant');


/*** post new restaurant */
const NewRestaurant = asynchandler(async (req, res) => {

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
})

/*** update restaurant */
const UpdateRestaurant = asynchandler(async (req, res) => {

    let restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
        return res.status(404).json({ message: "this restaurant not found" });
    } else {
        restaurant = await Restaurant.findByIdAndUpdate({ _id: req.params.id }, { $set: { ...req.body } }, { new: true })
        res.status(200).json({ status: "success", restaurant });
    }
})

/*** delete restaurant */
const DeleteRestaurant = asynchandler(async (req, res) => {

    let restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
        return res.status(404).json({ message: "this restaurant not found" });
    } else {
        restaurant = await Restaurant.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ status: "success", message: "deleted successfully" });
    }
})

/*** get all restaurants */
const GetRestaurants = asynchandler(async (req, res) => {

    const restaurants = await Restaurant.find();
    res.status(200).json({ status: "success", restaurants });

})

/*** get single restaurant */
const GetSingleRestaurants = asynchandler(async (req, res) => {

    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
        return res.status(404).json({ message: "this restaurant not found" });
    } else {
        res.status(200).json({ status: "success", restaurant });
    }
})




module.exports = {
    GetRestaurants,
    GetSingleRestaurants,
    UpdateRestaurant,
    NewRestaurant,
    DeleteRestaurant
}