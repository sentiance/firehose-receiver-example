'use strict'

const http = require('http')

const basicAuth = require('express-basic-auth')
const bodyParser = require('body-parser')
const express = require('express')

const app = express()
const server = http.createServer(app)

app.set('port', 3001)
app.use(bodyParser.json())

app.use('/webhook', basicAuth({  users: { 'sentiance': 'securepassword' }  }))

app.post(
    '/webhook',
    (req, res) => {

        console.log('Received webhook message')
        console.log(req.body)
        res.status(200).end()
    }
)

// If you are to receive events from multiple Application IDs on a single endpoint, a route like this helps in
// identifying the Application ID from which a message originates.
app.post(
    '/webhook/:app_id',
    (req, res) => {

        console.log(`Received webhook message from ${req.params.app_id}`)
        console.log(req.body)
        res.status(200).end()
    }
)

server.listen(app.get('port'), function() {
    console.log(`Server listening on ${app.get('port')}`)
})
