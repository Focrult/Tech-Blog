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
  
  // Add associations between models here, if needed
  
  sequelize.sync({ force: true })
    .then(() => {
      console.log('Database synchronized successfully');
    })
    .catch((error) => {
      console.error('Error synchronizing database:', error);
    });





module.exports = { sequelize, User, Post, Comment};