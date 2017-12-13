'use strict'
const express = require('express')
const bodyParser = require('body-parser')
// Get dependencies
const http = require('http')
// winston for logging
const winston = require('winston')
// Get our API routes
const api = require('./lib/routes/api')
const user = require('./lib/routes/user')
const transaction = require('./lib/routes/transaction')

const mongoose = require('mongoose')
const connection = mongoose.connect('mongodb://localhost/finance')

const app = express()

app.use(require('cors')())
// Parsers for POST data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// Cross Origin middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})


//winston logging in file
winston.configure({
    transports: [
        new (winston.transports.File)({ filename: './log/all.log', colorize: true })
    ]
})

// Set our api routes
app.use('/', api)
app.use('/api', user)
app.use('/api', transaction)
/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '5000'
app.set('port', port)

/**
 * Create HTTP server.
 */
const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () =>  {
    winston.log('info', 'Hello distributed log files!')
    console.log(`API running on localhost:${port}`)
})
