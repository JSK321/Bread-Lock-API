const sequelize_fixtures = require('sequelize-fixtures');
const models = require('./models');
module.exports = function (){
    const seed = sequelize_fixtures.loadFile("./fixtures/foodbankSeeds.json", models).then(function(){
            console.log("success")
        });
        
    return seed
}