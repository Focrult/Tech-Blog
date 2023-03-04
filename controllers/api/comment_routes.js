const express = require('express');
const router = express.Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');
// Get all comments
router.get('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id);
    if (commentData) {
      res.status(200).json(commentData);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });
    res.status(201).json(commentData);
  } catch (err) {
    res.status(400).json({ error: 'Bad request' });
  }
});
router.put('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id);
    if (commentData) {
      await commentData.update({ comment_text: req.body.comment_text });
      res.status(200).json(commentData);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id);
    if (commentData) {
      await commentData.destroy();
      res.status(200).json(commentData);
    } else {
      res.status(404).json({ error: 'Comment not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
