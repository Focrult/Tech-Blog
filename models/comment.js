const { Model, DataTypes } = require('sequelize');

class Comment extends Model {}
    Comment.init({









        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    });
    
    module.exports = Comment;


