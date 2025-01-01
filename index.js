const express = require('express');
const app = express();


app.get('/image', (req, res) => {
    res.sendFile(__dirname + '/image.jpg');
});

app.listen(3000, () => {
    console.log('Server is running');
});