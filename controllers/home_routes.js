const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
// Import the models
const { User, Post, Comment } = require('../models');

const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User }],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', async (req, res) => {
  try {

    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.userId = user.id;
    res.redirect('/');
  } catch (err) {
 
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment, include: [User] }],
    });

    const post = postData.get({ plain: true });

    res.render('post', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }finally{
    console.log("Passing through router.get posts/:id")
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    const posts = user.Posts.map((post) => post.get({ plain: true }));

    res.render('dashboard', { user, posts, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  } finally {
    console.log("Passing through router.get /dashboard");
  }
});

module.exports = router;