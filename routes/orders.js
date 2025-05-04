const express = require('express');
const router = express.Router();
const asynchandler = require('express-async-handler');
const { validatecreateorder, Order } = require('../models/Order');
const { verifytoken, verifytokenandisadmin } = require('../middlweres/verifymidllwere');
const { Food } = require('../models/Food');

router.get('/', verifytokenandisadmin, asynchandler(async (req, res) => {
    const orders = await Order.find().populate("user", ["_id", "username", "birthdate"]);
    res.status(200).json({ status: "success", orders });
}))

router.get('/:id', asynchandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", ["_id", "username", "birthdate"]);
    if (!order) {
        return res.status(404).json({ message: "this order not found" })
    } else {
        res.status(200).json({ status: "success", order });
    }
}))

router.post('/', verifytoken, asynchandler(async (req, res) => {
    const { error } = validatecreateorder(req.body);
    if (error) {
        return res.status(404).json({ message: error.details[0].message })
    }

    let totalprice = 0;

    for (let item of req.body.foods) {
        const food = await Food.findById(item.food.toString());
        if (!food) {
            return res.status(403).json({ message: "food not found" })
        }
        totalprice += food.price * item.quantity
    }

   let neworder = new Order({
        address: req.body.address,
        foods: req.body.foods,
        phone: req.body.phone,
        totalPrice: totalprice,
        status: req.body.status,
        user: req.user.id
    })
    await neworder.save();

    res.status(201).json({ status: "success", neworder });
}))

router.patch('/:id', verifytoken, asynchandler(async (req, res) => {
    let order = await Order.findById(req.params.id)
    if (!order) {
        return res.status(404).json({ message: "this order not found" })
    } else {

        if (req.user.id === order.user.toString()) {
            let totalprice = 0;
            for (let item of req.body.foods) {
                const food = await Food.findById(item.food.toString());
                if (!food) {
                    return res.status(403).json({ message: "food not found" })
                }
                totalprice += food.price * item.quantity
            }
            order = await Order.findByIdAndUpdate({ _id: req.params.id },
                {
                    $set: {
                        address: req.body.address,
                        foods: req.body.foods,
                        phone: req.body.phone,
                        totalPrice: totalprice,
                        status: req.body.status,
                        user: req.user.id
                    }
                }, { new: true })
            return res.status(200).json({ status: "success", order });
        } else {
            return res.status(200).json({ message: "not allwod only user" });
        }
    }
}))

router.delete('/:id', verifytoken, asynchandler(async (req, res) => {
    let order = await Order.findById(req.params.id)
    if (!order) {
        return res.status(404).json({ message: "this order not found" })
    } else {
        if (req.user.id === order.user.toString() || req.user.isAdmin) {
            order = await Order.deleteOne({ _id: req.params.id })
            return res.status(200).json({ status: "success", message: "deleted successfully" });
        } else {
            return res.status(200).json({ message: "not allwod only user" });
        }
    }
}))


module.exports = router;