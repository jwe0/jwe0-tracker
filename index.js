const express = require('express');
const app = express();


app.get('/image', (req, res) => {
    res.sendFile("https://http.cat/404");
});

app.listen(3000, () => {
    console.log('Server is running');
});