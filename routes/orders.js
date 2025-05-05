const express = require('express');
const router = express.Router();
const { verifytoken, verifytokenandisadmin } = require('../middlweres/verifymidllwere');
const { DeleteOrder, UpdateOrder, NewOrder, GetSingleOrder, GetOrders } = require('../controller/OrderController');



router.get('/', verifytokenandisadmin, GetOrders)



router.get('/:id', GetSingleOrder)



router.post('/', verifytoken, NewOrder)



router.patch('/:id', verifytoken, UpdateOrder)



router.delete('/:id', verifytoken, DeleteOrder)


module.exports = router;