'use strict'

const User = require('../models/user')

module.exports = {
    getAll () {
        console.log('user getAll')
        console.log(new Date())
        return User
            .find()
            .populate('transactions')
            .exec()
    },
    getOne (_id) {
        console.log('user getOne')
        console.log(new Date())
        return User
            .findById({_id: _id})
            .populate('transactions')
            .exec()
    },
    addOne (user) {
        console.log('user addOne')
        console.log(new Date())
        let _user = new User(user)
        return _user.save()
    },
    updateOne (_id, _user) {
        console.log('user updateOne')
        console.log(new Date())
        _user.updatedAt = new Date()
        return User
            .findByIdAndUpdate({_id: _id}, _user)
            .populate('transactions')
            .exec()
    },
    deleteOne (_id) {
        console.log('user deleteOne')
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
        console.log('user startsWith')
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
            .populate('transactions')
            .exec()
    },
    search (alpha) {
        console.log('user search')
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
            .populate('transactions')
            .exec()
    }
}
