'use strict'

const express = require('express')
const router = express.Router()

const articleController = require('../controllers/article')

router
    .get('/article', articleController.getAll)
    .post('/article', articleController.addOne)
    .get('/article/:_id', articleController.getOne)
    .put('/article/:_id', articleController.updateOne)
    .delete('/article/:_id', articleController.deleteOne)
    .get('/article/startsWith/:alpha', articleController.startsWith)
    .get('/article/search/:text', articleController.search)
// export router
module.exports = router