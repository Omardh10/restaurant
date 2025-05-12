const express = require('express');
const { verifytokenandisadmin } = require('../middlweres/verifymidllwere');
const { GetRestaurants, GetSingleRestaurants, NewRestaurant, UpdateRestaurant, DeleteRestaurant } = require('../controller/RestaurantController');
const router = express.Router();


// get all restaurants
router.get('/', GetRestaurants)


// get single restaurant
router.get('/:id', GetSingleRestaurants)


// post new restaurant
router.post('/', verifytokenandisadmin, NewRestaurant)


// update restaurant
router.patch('/:id', verifytokenandisadmin, UpdateRestaurant)


// delete restaurant
router.delete('/:id', verifytokenandisadmin, DeleteRestaurant)





module.exports = router;