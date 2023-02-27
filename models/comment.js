const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { getCurrentTimestamp } = require('../utils/helpers');

class Comment extends Model {}
Comment.init(
  {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comment_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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