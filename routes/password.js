const express = require('express');
const { ForgotPassword, ResetPassword } = require('../controller/PasswordController');
const router = express.Router();


/*** this is code forgot the password */

router.post('/forgot-password', ForgotPassword)

/*** this is code reset the password */

router.post('/reset-password/:userId/:token',ResetPassword )
















module.exports = router