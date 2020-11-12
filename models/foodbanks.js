module.exports = function(sequelize, DataTypes) {
    // Store Customer values for interaction with other models
    const FoodBanks = sequelize.define("FoodBanks", {
        bankName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // email force not null would be better, for login later
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // Everything else "can" be null, but most won't
        phone: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        // Used cityName and stateName because state is used in react, so don't want to overwrite
        cityName: {
            type: DataTypes.STRING
        },
        stateAbr: {
            type: DataTypes.STRING
        },
        zipCode: {
            type: DataTypes.STRING
        }
    })
    FoodBanks.associate = function(models) {
        // add associations here
        // Orders will only ever belong to a Customer or a FoodBanks and if either are deleted the order should be
        FoodBanks.hasOne(models.Orders, {
            onDelete: "cascade"
        });
        FoodBanks.hasOne(models.Pantries, {
            onDelete: "cascade"
        });
    };
    

    return FoodBanks;
}

// In the routes you'd need a Character.addClass(id of the class), for post request
