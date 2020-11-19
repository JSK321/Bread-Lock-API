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

    return User;
}