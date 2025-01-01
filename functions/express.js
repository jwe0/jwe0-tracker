const express = require('express');
const serverless = require('serverless-http');
const my_script = require('./Assets/script.js');
const app = express();

app.get('/image', (req, res) => {
    my_script.run();
    res.sendFile(__dirname + './Assets/1x1.png');
});

module.exports.handler = serverless(app);