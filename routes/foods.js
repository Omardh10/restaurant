const express = require('express');
const router = express.Router();
const { uploadphoto } = require('../middlweres/multer');
const { verifytokenandisadmin } = require('../middlweres/verifymidllwere');
const { DeleteFood, UpdateImageFood, UpdateFood, NewFood, GetSingleFood, GetFoods } = require('../controller/FoodsController');


// get all foods
router.get('/', GetFoods)


// get single food
router.get('/:id', GetSingleFood)


// post new food
router.post('/', verifytokenandisadmin, uploadphoto.single('image'), NewFood)


// update food
router.patch('/:id', verifytokenandisadmin, UpdateFood)


// update image of food
router.patch('/upload-image/:id', verifytokenandisadmin, uploadphoto.single('image'), UpdateImageFood)


// delete food
router.delete('/:id', DeleteFood)





module.exports = router;