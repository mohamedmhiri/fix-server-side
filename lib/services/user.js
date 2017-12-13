'use strict'

const User = require('../models/user')
const jwt         = require('jwt-simple')
const passport	= require('passport')
const config      = require('../config/database') // get db config file

const getToken = require('../utils/token').getToken
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
    },
    login (email, password) {
        return User.findOne({
                email: email
            })
            .exec((err, user) => {
                if (err) {
                    console.error(err)
                }
                else {
                    if (!user) {
                        console.error(`Authentication failed. User not found.`)
                        //res.send({success: false, msg: 'Authentication failed. User not found.'})
                    }
                    else {
                        // check if password matches
                        user.comparePassword(password, (err, isMatch) => {
                            if (isMatch && !err) {
                                // if user is found and password is right create a token
                                const token = jwt.encode(user, config.secret)
                                // return the information including token as JSON
                                return {success: true, token: 'JWT ' + token}
                            } else {
                                return {success: false, msg: 'Authentication failed. Wrong password.'}
                            }
                        })
                    }
                }
            })
    },
    signUp () {
        if (!req.body.nom || !req.body.password) {
            res.json({success: false, msg: 'Please pass name and password.'})
        }
        else
        {var newUser = new User({
            nom: req.body.nom,
            password: req.body.password,
            email:req.body.email

        })
            // save the user
            newUser.save(function(err) {
                if (err) {
                    return res.json({success: false, msg: 'Username already exists.',err:err})
                }
                res.json({success: true, msg: 'Successful created new user.',username:user.nom})
            })}
    },
    memberInfo () {
        var token = getToken(req.headers)
        if (token) {
            var decoded = jwt.decode(token, config.secret)
            console.log(decoded)
            user.findOne({
                email: decoded.email,

            }, function(err, user) {
                if (err) throw err

                if (!user) {
                    return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'})
                } else {
                    res.json({success: true, msg: 'Welcome in the member area ' + user.nom + '!'})
                }
            })
        } else {
            return res.status(403).send({success: false, msg: 'No token provided.'})
        }
    },
    updateUser () {
        user.findOneAndUpdate({
            email: req.params.mail
        },req.body, function(err, user) {
            if (err) throw err

            if (!user) {
                return res.status(404).json()
            } else res.status(200).json(user)


        })
    },
    findUser () {
        user.findOne({
            email: req.params.mail
        }, function(err, user) {
            if (err) throw err

            if (!user) {
                return res.status(404).json()
            } else res.status(200).json(user)


        }).populate('transaction') 
    }
}
