const express = require('express');
const router = express.Router();
const { verifytoken, verifytokenandisadmin } = require('../middlweres/verifymidllwere');
const { DeleteOrder, UpdateOrder, NewOrder, GetSingleOrder, GetOrders } = require('../controller/OrderController');


// Get All Orders
router.get('/', verifytokenandisadmin, GetOrders)


// Get Single Order
router.get('/:id', GetSingleOrder)


// Post New Order
router.post('/', verifytoken, NewOrder)


// Update Order
router.patch('/:id', verifytoken, UpdateOrder)


// Delete Order
router.delete('/:id', verifytoken, DeleteOrder)


module.exports = router;