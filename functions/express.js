const express = require('express');
const serverless = require('serverless-http');
const app = express();

app.get('/image', (req, res) => {
    res.sendFile(__dirname + '/Assets/1x1.png');
});

module.exports.handler = serverless(app);
