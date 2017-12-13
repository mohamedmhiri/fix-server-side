'use strict'

const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

router
    .get('/user', userController.getAll)
    .post('/user', userController.addOne)
    .get('/user/:_id', userController.getOne)
    .put('/user/:_id', userController.updateOne)
    .delete('/user/:_id', userController.deleteOne)
    .get('/user/startsWith/:alpha', userController.startsWith)
    .get('/user/search/:text', userController.search)
// export router
module.exports = router