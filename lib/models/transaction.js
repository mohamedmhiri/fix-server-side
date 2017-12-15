'use strict'
const mongoose = require('mongoose')
const user = require('./user')

mongoose.Promise = Promise

const Schema = mongoose.Schema

const TransactionSchema = Schema({
    req: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    dir: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        required: false,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: false,
        default: Date.now
    },
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Transaction = mongoose.model('Transaction', TransactionSchema)

module.exports = Transaction