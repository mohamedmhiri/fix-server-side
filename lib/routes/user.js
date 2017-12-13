'use strict'

const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

const passport	= require('passport')
const myPassportService = require('../config/passport')(passport)

router
    .get('/user', userController.getAll)
    .post('/user', userController.addOne)
    .get('/user/:_id', userController.getOne)
    .put('/user/:_id', userController.updateOne)
    .delete('/user/:_id', userController.deleteOne)
    .get('/user/startsWith/:alpha', userController.startsWith)
    .get('/user/search/:text', userController.search)
    //.get('/info', passport.authenticate('jwt', { session: false}),userController.memberinfo)
    .post('/authenticate', userController.login)
    .post('/signup', userController.signUp)
    .put('/update/:mail', userController.updateUser)
    .get('/get/:mail', userController.findUser)
// export router
module.exports = router





