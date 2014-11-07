"use strict";

var express = require("express");
var xmpp = require('simple-xmpp');
var http = require("http");
var bodyParser = require("body-parser");
var basicAuth = require('basic-auth-connect');

var config = require("./config");

var app = express();
app.use(bodyParser());

app.use(basicAuth(function(user, pass) {
    console.log("auth", user);
    return config.credentials[user] === pass;
}));

var server = http.createServer(app);

app.post("/rooms/:room", function(req, res) {
    var room = req.params.room;
    var message = "<"+req.user+"> " + req.body.message;

    console.log("Sending message to room", room, message);
    xmpp.join(room + "/http2xmpp");
    xmpp.send(room, message, true);
    res.json({ok:true});
});

app.post("/users/:user", function(req, res) {
    var user = req.params.user;
    var message = "<"+req.user+"> " + req.body.message;

    console.log("Sending message to user", user, message);
    xmpp.send(user, message);
    res.json({ok:true});
});


xmpp.connect({
    jid: config.jid,
    password: config.password
});

xmpp.on('online', function(data) {
    console.log('Connected with JID: ' + data.jid.user);
    console.log('Yes, I\'m connected!');
    server.listen(process.env.PORT || config.port || 8080, function() {
        var addr = server.address();
        console.log('Listening on  http://%s:%d', addr.address, addr.port);
    });
});
