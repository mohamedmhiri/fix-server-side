'use strict'
const mongoose = require('mongoose')
const user = require('./user')

mongoose.Promise = Promise

const Schema = mongoose.Schema

const TransactionSchema = Schema({
    value: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    direction: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
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