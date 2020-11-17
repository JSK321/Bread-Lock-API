module.exports = function(sequelize, DataTypes) {
    // Store Stock values for interaction with other models
    const Stock = sequelize.define("Stock", {
        stockName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        size: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        // email force not null would be better, for login later
        unitType: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
    Stock.associate = function(models) {
        // add associations here
        // Orders will only ever belong to a Stock or a FoodBank and if either are deleted the order should be
        Stock.hasMany(models.OrderItem, {
            onDelete: "cascade"
        });
        Stock.hasMany(models.Pantry, {
            onDelete: "cascade"
        });
    };
    

    return Stock;
}