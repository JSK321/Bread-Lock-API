const bcrypt = require("bcrypt")

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define('User', {
        email:{
            type:DataTypes.STRING,
            unique:true
        },
        password:{
            type:DataTypes.STRING,
            required:true,
            validate:{
                len:[8]
            }
        }
    })

    User.associate = function(models) {
        User.hasOne(models.Customer, {
            onDelete: "cascade"
        });
    }

    User.beforeCreate(function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
    }) 

    return User;
}