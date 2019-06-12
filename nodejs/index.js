//Copyright 2019 Sentiance NV
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

'use strict'

const http = require('http')

const basicAuth = require('express-basic-auth')
const bodyParser = require('body-parser')
const express = require('express')

const app = express()
const server = http.createServer(app)

app.set('port', 3001)
app.use(bodyParser.json())

app.use('/webhook', basicAuth({
    // Update these to change the username/password to authenticate against.
    users: { 'sentiance': 'securepassword' }  })
)

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
