//dependencies 
const express = require("express")
const cors = require('cors')


//sets up the express app
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//require models for syncing
var db = require("./models");

//Import Routes for controllers
var allRoutes = require('./controllers')

// Production Cors
// Fix Heroku Deployed to the actual live site
// app.use(cors({
//     origin:["https://herokudeployed.com"]
// }))

// Dev Cors
app.use(cors())

//Set up routes
app.use('/', allRoutes);

//syncing our sequelize models and then starting express app

// Remember force: true restarts the server AND will need RESEEDING

db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        seedModels()
        console.log("App listening on PORT " + PORT);
    });
});

