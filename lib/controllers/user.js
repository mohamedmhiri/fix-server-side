'use strict'

const userService = require('../services/user')
const jwt         = require('jwt-simple')
const passport	= require('passport')
const config      = require('../config/database') // get db config file
// winston for logging
const winston = require('winston')
const getToken = require('../utils/token').getToken

module.exports = {
    async getAll (req, res) {
    const users = await userService.getAll()
    res.json(users)
    },
    async addOne (req, res) {
        const user = await userService.addOne(req.body)
        console.log(user)
        res.json(user)
    },
    async getOne (req, res) {
        const user = await userService.getOne(req.params._id)
        res.json(user)
    },
    async updateOne (req, res) {
        console.log(req.params._id)
        const user = await userService.updateOne(req.params._id, req.body)
        res.json(user)
    },
    async deleteOne (req, res) {
        const user = await userService.deleteOne(req.params._id)
        res.json(user)
    },
    async startsWith (req, res) {
        const user = await userService.startsWith(req.params.data)
        res.json(user)
    },
    async search (req, res) {
        const user = await userService.search(req.params.text)
        res.json(user)
    },
    async login (req, res) {
        const user = await userService.login(req.body.email, req.body.password)
        const token = jwt.encode(user, config.secret)
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
                // if user is found and password is right create a token
                const token = jwt.encode(user, config.secret)
                // return the information including token as JSON
                winston.log('info', `${token}: JWT${token}`)
                res.json({success: true, token: `JWT${token}`})
            } else {
                winston.log('info', `Authentication failed. Wrong password.`)
                res.json({success: false, msg: 'Authentication failed. Wrong password.'})
            }
        })
        //res.json(user)
    },
    async signUp (req, res) {
        const user = await userService.signUp(req.body)
        winston.log('info', user)
        res.json(user)
    },
    async memberInfo (req, res) {
        const user = await userService.memberInfo()
        winston.log('info', user)
        res.json(user)
    },
    async updateUser (req, res) {
        const user = await userService.updateUser()
        winston.log('info', user)
        res.json(user)
    },
    async findUser (req, res) {
        const user = await userService.findUser()
        winston.log('info', user)
        res.json(user)
    }
    
}
