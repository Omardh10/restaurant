const express = require('express');
const router = express.Router();
const asynchandler = require('express-async-handler');
const { validateregister, User, validatelogin, validateupdateregister } = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { verifytokenandisadmin, verifytokenandonlyuser, verifytokenandauthorization } = require('../middlweres/verifymidllwere');


router.get('/', verifytokenandisadmin, asynchandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json({ status: "success", users })
}))
router.get('/:id', asynchandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(400).json({ message: "user not found" })
    }

    res.status(200).json({ status: "success", user })
}))
router.post('/auth/register', asynchandler(async (req, res) => {


    const { error } = validateregister(req.body)
    if (error) {
        return res.status(404).json({ message: error.details[0].message })
    }
    const olduser = await User.findOne({ email: req.body.email })
    if (olduser) {
        return res.status(404).json({ message: "this user already registered" })
    }
    const hashpassword = await bcrypt.hash(req.body.password, 10);
    const newuser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashpassword,
        phonenumber: req.body.phonenumber,
        city: req.body.city,
        gender: req.body.gender,
        birthdate: req.body.birthdate,
    })
    const token = jwt.sign({ id: newuser._id, isAdmin: newuser.isAdmin }, "secret-key12309876567")
    newuser.token = token;
    await newuser.save();

    res.status(201).json({ status: "success", newuser })
}))

router.post('/auth/login', asynchandler(async (req, res) => {
    const { email, password } = req.body;
    const { error } = validatelogin(req.body);
    if (error) {
        return res.status(404).json({ message: error.details[0].message })
    }
    const user = await User.findOne({ email: email })
    if (!user) {
        return res.status(401).json({ message: "invalid email or password" })
    }
    const matchedpassword = await bcrypt.compare(password, user.password)
    if (!matchedpassword) {
        return res.status(404).json({ message: "invalid email or password" })
    }
    if (user && matchedpassword) {
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, "secret-key12309876567")
        user.token = token;
        // user.save();
        res.status(201).json({ userId: user._id, username: user.username, token: token, });
    }
}))

router.patch('/:id', verifytokenandonlyuser, asynchandler(async (req, res) => {

    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(400).json({ message: "user not found" })
    }

    console.log(req.headers);
    const { error } = validateupdateregister(req.body)
    if (error) {
        return res.status(404).json({ message: error.details[0].message })
    }
    if (req.body.password) {
        const hashpassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashpassword;
    }


    const updateuser = await User.findByIdAndUpdate({ _id: req.params.id }, {
        $set: {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            phonenumber: req.body.phonenumber,
            city: req.body.city,
            gender: req.body.gender,
            birthdate: req.body.birthdate,
        }
    }, { new: true })

    res.status(201).json({ status: "success", updateuser })
}))

router.delete('/:id', verifytokenandauthorization, asynchandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(400).json({ message: "user not found" })
    }
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "deleted seccussfully" })
}))
module.exports = router;