const express = require('express');
const router = express.Router();
const { uploadphoto } = require('../middlweres/multer');
const { verifytokenandisadmin } = require('../middlweres/verifymidllwere');
const { DeleteFood, UpdateImageFood, UpdateFood, NewFood, GetSingleFood, GetFoods } = require('../controller/FoodsController');



router.get('/', GetFoods)



router.get('/:id', GetSingleFood)



router.post('/', verifytokenandisadmin, uploadphoto.single('image'), NewFood)



router.patch('/:id', verifytokenandisadmin, UpdateFood)



router.patch('/upload-image/:id', verifytokenandisadmin, uploadphoto.single('image'), UpdateImageFood)



router.delete('/:id', DeleteFood)



module.exports = router;