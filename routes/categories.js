const express = require('express');
const router = express.Router();
const { verifytokenandisadmin } = require('../middlweres/verifymidllwere');
const { GetCategory, GetSingleCategory, NewCategory, UpdateCategory, DeleteCategory } = require('../controller/CategoriesController');



router.get('/',GetCategory )



router.get('/:id',GetSingleCategory)



router.post('/', verifytokenandisadmin, NewCategory)



router.patch('/', verifytokenandisadmin,UpdateCategory)



router.delete('/:id', verifytokenandisadmin, DeleteCategory)


















module.exports = router