// controllers/api/post-routes.js
//boilerplate code from previous activities
const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to update a post by ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (!updatedPost[0]) {
      res.status(404).json({ message: 'Post not found or you are not the owner' });
      return;
    }

    res.json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to delete a post by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deletedPost) {
      res.status(404).json({ message: 'Post not found or you are not the owner' });
      return;
    }

    res.json(deletedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
