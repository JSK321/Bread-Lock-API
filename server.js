//dependencies 
const express = require("express")


//sets up the express app
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"))

//require models for syncing
var db = require("./models");

//Import Routes for controllers

// Rename Controllers to Reflect Bread-Lock

const customerController = require('./controllers/customer-controller')
app.use(customerController)

// const htmlController = require('./controllers/html-controller')
// app.use(htmlController)

//syncing our sequelize models and then starting express app

// Remember force: true restarts the server AND will need RESEEDING

db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});


// In the routes you'd need a Character.addClass(id of the class), for post request