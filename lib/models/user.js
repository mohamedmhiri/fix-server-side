'use strict'
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
mongoose.Promise = Promise

const Schema = mongoose.Schema
// winston for logging
const winston = require('winston')
const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    liquid: {
        type: String,
        required: false
    },
    available: {
        type: String,
        required: false
    },
    value: {
        type: String,
        required: false
    },
    transactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Transaction'
    }]
})

UserSchema.pre('save', function (next) {
    var user = this
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err)
                }
                user.password = hash
                next()
            })
        })
    } else {
        return next()
    }
})

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}
const User = mongoose.model('User', UserSchema)

module.exports = User
