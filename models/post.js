const { Model, DataTypes } = require('sequelize');

class Post extends Model {}

Post.init({
title:{
    type: DataTypes.STRING,
    allowNull: false
},
content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: 'id'
    }
  }
},
{
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
});
Post.belongsTo(User, {
    foreignKey: 'userID'
});
module.exports = Post;