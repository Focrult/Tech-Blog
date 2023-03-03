const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts associated with the currently logged-in user
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      attributes: ['id', 'title', 'text', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'user_id', 'created_at'],
          include: { model: User, attributes: ['username'] }
        }
      ]
    });
    res.status(200).json(postData.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});
// Get all posts by user id
router.get('/user/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.params.id },
      attributes: ['id', 'title', 'text', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'user_id', 'created_at'],
          include: { model: User, attributes: ['username'] }
        }
      ]
    });
    res.status(200).json(postData.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});
// Get one post by id
router.get('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'title', 'text', 'created_at'],
      include: [
        { model: User, attributes: ['username'] },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'user_id', 'created_at'],
          include: { model: User, attributes: ['username'] }
        }
      ]
    });
    if (!postData) {
      res.status(404).json({ message: 'No posts found' });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      text: req.body.text,
      user_id: req.session.user_id
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a post by id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      { title: req.body.title, text: req.body.text },
      { where: { id: req.params.id } }
    );
    if (!updatedPost[0]) {
      res.status(404).json({ message: 'No posts found' });
      return;
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a post by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedPost = await Post.destroy({ where: { id: req.params.id } });
    if (!deletedPost) {
      res.status(404).json({ message: 'No posts found' });
      return;
    }
    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;