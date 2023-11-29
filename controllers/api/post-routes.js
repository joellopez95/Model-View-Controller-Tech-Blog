const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      userid: req.session.userid,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.post('/create-post', withAuth, async (req, res) => {
//   try {
//     const { title, content } = req.body;

//     // Create a new post associated with the logged-in user
//     const newPost = await Post.create({
//       title,
//       content,
//       userid: req.session.userid,
//     });

//     // Redirect or respond as needed
//     res.redirect('/'); // Redirect to the homepage
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        userid: req.session.userid,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
