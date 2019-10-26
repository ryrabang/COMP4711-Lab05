var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');
var artist = require('./js/artists');

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/', function (request, response) {
    response.sendFile('/index.html');
    response.sendFile('/data.json');
})

app.post('/delete', function (request, response) {
    let id = request.body.id;
    console.log(id);
    artist.deleteIndex(id);
    response.json({"200": "OK"});
})

app.post('/add', function (request, response) {
    let name = request.body.name;
    let quote = request.body.quote;
    let img = request.body.image;
    let id = request.body.id
    artist.addArtist(name, quote, img, id);
    response.json({"200": "OK"});
})

app.listen(process.env.PORT || 3000, () => console.log('Server is running on 3000'));

