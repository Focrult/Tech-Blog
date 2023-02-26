const { Model, DataTypes } = require('sequelize');

class Post extends Model {}

Post.init({









    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
});

module.exports = Post;