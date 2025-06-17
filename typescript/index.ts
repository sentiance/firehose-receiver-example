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

import http from 'http';
import express from 'express';
import basicAuth from 'express-basic-auth';
import bodyParser from 'body-parser';

const app = express();
const server = http.createServer(app);

app.set('port', 3001);
app.use(bodyParser.json());

app.use('/webhook', basicAuth({
    // Update these to change the username/password to authenticate against.
    users: { 'sentiance': 'securepassword' }
}));

app.post('/webhook', (req, res) => {
    console.log('Received webhook message');
    doSomething(req.body);
    res.status(200).end();
});

app.post('/webhook/:app_id', (req, res) => {
    console.log(`Received webhook message from ${req.params.app_id}`);
    console.log(req.body);
    res.status(200).end();
});

function doSomething(events: any) {
    for (const event of events.data) {
        console.log(`Received event of type ${event.meta.message_type} at ${event.meta.message_timestamp}`);
        console.log(event.data);
    }
}

server.listen(app.get('port'), () => {
    console.log(`Server listening on ${app.get('port')}`);
});
