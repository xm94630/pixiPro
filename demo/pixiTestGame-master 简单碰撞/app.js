"use strict";

var express = require('express');
var app = express();
var server = require('http').Server(app);

//use path object to make server platform agnostic
var path	= require('path');

//open port for game to be played on
var sitePath = process.argv[2] || ".";
var port = 7777;
var address = "http://localhost:";

var gameRoute = path.join(__dirname, sitePath);
gameRoute = path.normalize(gameRoute);

/*
//request logging
app.use(function(req, res, next) {
	console.log(req.url);
	next();
});
*/

//start server
console.log(sitePath);
console.log("Starting server in: " + gameRoute);

app.use(express.static(gameRoute));
server.listen(port, (noArgs) => {
	console.log("Server running at: " + address + port);
});
