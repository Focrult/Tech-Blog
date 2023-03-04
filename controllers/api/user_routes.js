const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
// Get all users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({ attributes: { exclude: ['password'] } });
    console.log(userData);
    console.log("///////////////////////////////////////////////////////////////////");
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get('/user/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      attributes: { exclude: ['password'] },
      where: { id: req.params.id },
      include: [{ model: Post, attributes: ['id', 'title', 'text', 'created_at'] },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'created_at'],
          include: { model: Post, attributes: ['title'] }
        },
        { model: Post, attributes: ['title'] }
      ]
    });
    if (!userData) {
      res.status(404).json({ message: 'No user found with this id' });
      return;
    }
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/login', async (req, res) => {
  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++")
  console.log(req.body.username); //log the username
  console.log(req.body.password); //log the password
  try {
    console.log(req.body.username); //log the username
    console.log(req.body.password); //log the password
    
    const userData = await User.findOne({
      where: { username: req.body.username }
    });
    if (!userData) {
      res.status(400).json({ message: 'No account found!' });
      return;
    }
    console.log("userData: " + userData); 
    const validPassword = await userData.checkPassword(loginPw); //req.body.password returned false every time you enter an existing user. loginPw returns nothing
    console.log("validPassword: " + validPassword); 
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password, please try again!' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// Create a new user
router.post('/', async (req, res) => {
  try {
    console.log("*((*********************************************************************************");
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password
    });
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.json(userData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// User logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    console.log('User logged out');
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});
    
    module.exports = router;