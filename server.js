// Dependencies =============================================================
var express = require("express");
var path = require("path");
//  Sets up the Express App  =================================================
var app = express();
var PORT = 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var guests = [];
var waitlist = [];
var clear = [];

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});
app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});
app.get("/makeres", function(req, res) {
    res.sendFile(path.join(__dirname, "makeres.html"));
});
app.get("/viewres", function(req, res) {
    res.sendFile(path.join(__dirname, "viewres.html"));
});

// Displays guests object

app.get("/api/guests", function(req, res) {
    return res.json(guests);
});

app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
});

app.get("/api/clear", function(req, res) {
    return res.json(clear);
});

// Create New Characters - takes in JSON input

app.post("/api/guests", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newGuests = req.body;

    if (guests.length < 5) {
        guests.push(newGuests);
        res.json(true);
    } else {
        waitlist.push(newGuests);
        res.json(false);
    }
});

app.post("/api/waitlist", function(req, res) {

    var newGuests = req.body;

    newGuests.routeName = newGuests.name.replace(/\s+/g, "").toLowerCase();

    guests.push(newGuests);

    res.json(newGuests);
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});