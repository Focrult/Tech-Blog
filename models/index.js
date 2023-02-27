const User = require('./user.js');
const Post = require('./post.js');
const Comment = require('./comment.js');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
  });
  
  sequelize.define('user', User);
  sequelize.define('post', Post);
  sequelize.define('comment', Comment);
  
    User.hasMany(Post, { 
        foreignKey: 'user_id' 
    });
    Post.belongsTo(User, { 
        foreignKey: 'user_id' 
    });
    User.hasMany(Comment, { 
        foreignKey: 'user_id' 
    });
    Comment.belongsTo(User, { 
        foreignKey: 'user_id' 
    });
    Post.hasMany(Comment, { 
        foreignKey: 'post_id' 
    });
    Comment.belongsTo(Post, { 
        foreignKey: 'post_id' 
    });




  sequelize.sync({ force: true })
    .then(() => {
      console.log('Database synchronized successfully');
    })
    .catch((error) => {
      console.error('Error synchronizing database:', error);
    });





module.exports = { sequelize, User, Post, Comment};