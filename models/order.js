module.exports = function(sequelize, DataTypes) {
    // Store Customer values for interaction with other models
    const Order = sequelize.define("Order", {
        orderDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        recieved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    })
    Order.associate = function(models) {
        // add associations here
        Character.belongsToMany(models.Customers);
        Character.belongsTo(models.FoodBanks);
        // Orders will only ever belong to a Customer or a Orders and if either are deleted the order should be
        Order.hasMany(models.OrderItem, {
            onDelete: "cascade"
        });
    };
    

    return Order;
}