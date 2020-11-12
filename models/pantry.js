module.exports = function(sequelize, DataTypes) {
    // Store Customer values for interaction with other models
    const Pantry = sequelize.define("Pantry", {
        notClaimed: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        claimed: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    })
    Pantry.associate = function(models) {
        // add associations here
        Pantry.belongsToMany(models.Stock);
        Pantry.belongsTo(models.FoodBanks);        
    };
    

    return Pantry;
}