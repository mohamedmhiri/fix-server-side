'use strict'

const User = require('../models/transaction')

module.exports = {
    getAll () {
        console.log('transaction getAll')
        console.log(new Date())
        return User
            .find()
            .exec()
    },
    getOne (_id) {
        console.log('transaction getOne')
        console.log(new Date())
        return User.findById({_id: _id})
    },
    addOne (transaction) {
        console.log('transaction addOne')
        console.log(new Date())
        let _transaction = new User(transaction)
        return _transaction.save()
    },
    updateOne (_id, _transaction) {
        console.log('transaction updateOne')
        console.log(new Date())
        _transaction.updatedAt = new Date()
        User.findByIdAndUpdate({_id: _id}, _transaction)
        return {response: "200"}
    },
    deleteOne (_id) {
        console.log('transaction deleteOne')
        console.log(new Date())
        return User
            .findByIdAndRemove({_id: _id})
            .exec((err, data) => {
            if (err) {
                console.error(err)
            } else {
                console.log(data)
        }
    })
    },
    startsWith (alpha) {
        console.log('transaction startsWith')
        console.log(new Date())
        return User
            .find({
                $or: [
                    {code: RegExp(`^(${alpha.toLowerCase()}|${alpha})`)},
                    {designation: RegExp(`^(${alpha.toLowerCase()}|${alpha})`)},
                    {codeABare: RegExp(`^(${alpha.toLowerCase()}|${alpha})`)},
                    {vat: +alpha},
                    {prixAchatHT: +alpha},
                    {prixVenteHT: +alpha},
                    {stock: +alpha}
                ]})
            .exec()
    },
    search (alpha) {
        console.log('transaction search')
        console.log(alpha)
        console.log(new Date())
        return User
            .find({
                $or: [
                    {designation: RegExp(`.*(${alpha.toLowerCase()}|${alpha}).*`)},
                    // {designation: RegExp(`.*(${alpha.toLowerCase()}|${alpha}).*`)},
                    // {codeABare: RegExp(`.*(${alpha.toLowerCase()}|${alpha}).*`)},
                    /*{vat: +alpha},
                    {prixAchatHT: +alpha},
                    {prixVenteHT: +alpha},
                    {stock: +alpha}*/
                ]
            })
            .exec()
    }
}
