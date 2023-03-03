const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { getCurrentTimestamp } = require('../utils/helpers');
class Post extends Model {}

Post.init({
    title:{
        type: DataTypes.STRING,
        allowNull: false
        },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
        },
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'user',
        key: 'id',
    }
    },
        created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: getCurrentTimestamp(),
      },
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
});

module.exports = Post;