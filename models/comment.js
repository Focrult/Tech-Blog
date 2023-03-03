const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { getCurrentTimestamp } = require('../utils/helpers');

class Comment extends Model {}
Comment.init(
  {
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id',
      },
    },

//Testing this!
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
    modelName: 'comment',
  }
);

module.exports = Comment;