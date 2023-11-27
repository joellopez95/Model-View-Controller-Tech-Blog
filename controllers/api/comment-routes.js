// controllers/api/comment-routes.js
//boilerplate code from previous activities
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });

    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to update a comment by ID
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedComment = await Comment.update(
      {
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (!updatedComment[0]) {
      res.status(404).json({ message: 'Comment not found or you are not the owner' });
      return;
    }

    res.json(updatedComment);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to delete a comment by ID
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deletedComment) {
      res.status(404).json({ message: 'Comment not found or you are not the owner' });
      return;
    }

    res.json(deletedComment);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
