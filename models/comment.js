const { Model, DataTypes } = require('sequelize');

class Comment extends Model {}
    Comment.init({
    text:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false,
    }
    },
{
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    });
    
    module.exports = Comment;


