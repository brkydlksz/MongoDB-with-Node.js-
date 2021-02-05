//Imports
var MongoClient = require('mongodb').MongoClient;

var express = require("express");
var bodyParser = require('body-parser'); 
//Objects
var app = express();
//Global variables
var db;
//mongodb connection
MongoClient.connect( 'mongodb://localhost:27017', function(err, client) {
    if (err) throw err;

    db = client.db('treetest');
    
});
//POST interface data parsing method
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); 



//Server Port
const _port = process.env.PORT || 5000;
//Server Data
const _app_folder = __dirname + '/' ;

//This saves data to database
app.post('/post', function(request, response){
    console.log(request.body.Name);
    db.collection("tree").insertOne({name: request.body.Name,latitude:request.body.Latitude, longitude: request.body.Longitude,height:request.body.TreeHeight });
    
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end('Data Store Success!\n');     
});

//Pushes files from server to client. like "index html"
app.all('*', function (req, res) {
    res.status(200).sendFile(`/index.html`, {root: _app_folder});
});


// ---- START UP THE NODE SERVER  ----

app.listen(_port, function () {
    console.log("Node Express server for " + app.name + " listening on http://localhost:" + _port);
});