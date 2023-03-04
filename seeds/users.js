const { User } = require('../models');

const userInfo = [
    {
      "username": "FA",
      "password": "password123"
    },
    {
      "username": "Arthas",
      "password": "ilikeice8002"
    },
    {
      "username": "Uther",
      "password": "dontdisthelight2002"
    },
    {
      "username": "mega",
      "password": "Presentation!"
    },
    {
      "username": "Rosh",
      "password": "WOD>BFA+SL"
    }
  ];

  const seedUsers = () => User.bulkCreate(userInfo);
  module.exports = seedUsers;




