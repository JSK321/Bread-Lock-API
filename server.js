//dependencies 
const express = require("express")
const exphbs = require("express-handlebars")

//sets up the express app
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"))

//set handlebars as default template
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//require models for syncing
var db = require("./models");

//Import Routes for controllers
const characterController = require('./controllers/character-controller')
app.use(characterController)

const htmlController = require('./controllers/html-controller')
app.use(htmlController)

//syncing our sequelize models and then starting express app
db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});


// In the routes you'd need a Character.addClass(id of the class), for post request