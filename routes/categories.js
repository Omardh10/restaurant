const express = require('express');
const router = express.Router();
const { verifytokenandisadmin } = require('../middlweres/verifymidllwere');
const { GetCategory, GetSingleCategory, NewCategory, UpdateCategory, DeleteCategory } = require('../controller/CategoriesController');


// get all categories
router.get('/',GetCategory )


// get single category
router.get('/:id',GetSingleCategory)


// post new category
router.post('/', verifytokenandisadmin, NewCategory)


// update category
router.patch('/', verifytokenandisadmin,UpdateCategory)


// delete category
router.delete('/:id', verifytokenandisadmin, DeleteCategory)


















module.exports = router