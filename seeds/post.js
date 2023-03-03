const { Post } = require('../models');

const postData = [
    {
      title: "Twiiter or Facebook",
      text: "I want to create a discussion as to which application is better, have fun!",
      user_id: 1,
    },
    {
      title: "JavaScript is not that bad!",
      text: "I want to create a discussion where I believe that JavaScript is not all that bad.",
      user_id: 2,
    },
  ];
  
  const seedPosts = () => Post.bulkCreate(postData);

  module.exports = seedPosts;