'use strict'

const userService = require('../services/user')


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
    }
}
