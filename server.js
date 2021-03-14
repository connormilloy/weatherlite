require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const fetch = require('node-fetch');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
})

app.get("/weather/:city", async (req, res) => {
    const city = req.params.city;

    try{
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.APIKEY}`);
        const jsonRes = await response.json();
        console.log(`Received a GET request for ${city}!`)
        res.json(jsonRes);
    } catch(e) {throw e}

})

app.listen(port, () => {
    console.log(`Server listening on port ${port}..`)
})