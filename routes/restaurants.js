const express = require('express');
const { verifytokenandisadmin } = require('../middlweres/verifymidllwere');
const { GetRestaurants, GetSingleRestaurants, NewRestaurant, UpdateRestaurant, DeleteRestaurant } = require('../controller/RestaurantController');
const router = express.Router();



router.get('/', GetRestaurants)



router.get('/:id', GetSingleRestaurants)



router.post('/', verifytokenandisadmin, NewRestaurant)



router.patch('/:id', verifytokenandisadmin, UpdateRestaurant)



router.delete('/:id', verifytokenandisadmin, DeleteRestaurant)





module.exports = router;