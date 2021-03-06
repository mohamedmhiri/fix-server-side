'use strict'

const express = require('express')
const router = express.Router()

const transactionController = require('../controllers/transaction')

router
    .get('/transactions', transactionController.getAll)
    .post('/transaction', transactionController.addOne)
    .get('/transaction/:_id', transactionController.getOne)
    .put('/transaction/:_id', transactionController.updateOne)
    .delete('/transaction/:_id', transactionController.deleteOne)
    .get('/transaction/startsWith/:alpha', transactionController.startsWith)
    .get('/transaction/search/:text', transactionController.search)
    .get('/transaction/getBy/state/:state', transactionController.getByState)
// export router
module.exports = router