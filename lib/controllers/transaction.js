'use strict'

const transactionService = require('../services/transaction')


module.exports = {
    async getAll (req, res) {
    const transactions = await transactionService.getAll()
    res.json(transactions)
},
async addOne (req, res) {
    const transaction = await transactionService.addOne(req.body)
    console.log(transaction)
    res.json(transaction)
},
async getOne (req, res) {
    const transaction = await transactionService.getOne(req.params._id)
    res.json(transaction)
},
async updateOne (req, res) {
    console.log(req.params._id)
    const transaction = await transactionService.updateOne(req.params._id, req.body)
    res.json(transaction)
},
async deleteOne (req, res) {
    const transaction = await transactionService.deleteOne(req.params._id)
    res.json(transaction)
},
async startsWith (req, res) {
    const transaction = await transactionService.startsWith(req.params.data)
    res.json(transaction)
},
async search (req, res) {
    const transaction = await transactionService.search(req.params.text)
    res.json(transaction)
}
}
