var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');



async function deleteIndex(id) {
    var response = await readFile();
    var key = parseInt(id);
    var index = response.findIndex(obj => obj.id == key);
    response.splice(index, 1);
    fs.writeFile("public/data.json", JSON.stringify(response), "utf8", (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("File successfully written to!");
        }
      });

}

function readFile() {
    return new Promise(resolve => fs.readFile('./public/data.json', (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        text = JSON.parse(data)
        resolve(text);
    }));
}

async function addArtist(name, quote, img, id) {

    var response = await readFile();

    var newArtist = {"name" : name, "quote" : quote, "image" : img, "id" : id};
    response.push(newArtist);
    fs.writeFile("public/data.json", JSON.stringify(response), "utf8", (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("File successfully written to!");
        }
      });
}

module.exports = {
    addArtist: addArtist,
    deleteIndex: deleteIndex
}