const express = require('express');
const router = express.Router();
const { verifytokenandisadmin, verifytokenandonlyuser, verifytokenandauthorization } = require('../middlweres/verifymidllwere');
const { GetUsers, GetSingleUser, RegisterUser, LoginUser, UpdateUser, DeleteUser } = require('../controller/UsersController');



router.get('/', verifytokenandisadmin,GetUsers)



router.get('/:id', GetSingleUser)



router.post('/auth/register',RegisterUser)



router.post('/auth/login', LoginUser)



router.patch('/:id', verifytokenandonlyuser,UpdateUser)



router.delete('/:id', verifytokenandauthorization, DeleteUser)




module.exports = router;