const { Comment } = require('../models');


const commentData = [
    {
      comment_text: "Terrible Discussion! Reddit is the true mvp",
      user_id: 3,
      post_id: 1,
    },
    {
      comment_text: "Hmmmmmm. Watch this -> https://www.youtube.com/watch?v=aXOChLn5ZdQ&ab_channel=Fireship",
      user_id: 1,
      post_id: 2,
    },
  ];
  
  const seedComments = () => Comment.bulkCreate(commentData);
  module.exports = seedComments;