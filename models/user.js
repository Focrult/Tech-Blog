const { Model, DataTypes } = require('sequelize');

class User extends Model {}

User.init({









    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
});

module.exports = User;