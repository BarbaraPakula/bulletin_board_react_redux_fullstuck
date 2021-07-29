/* eslint-disable linebreak-style */
const express = require('express');
const router = express.Router();
const Post = require('../models/post.model');

router.get('/posts', async (req, res) => {
  try {
    const result = await Post.find({ status: 'published' })
      .select('author created updated title photo text')
      .sort({ created: -1 });
    if (!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post.findById(req.params.id);
    if (!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put(`/posts/:id/edit`, async (req, res) => {
  try {
    const {
      title,
      photo,
      text,
      author,
      created,
      updated,
      status,
      price,
      phone,
      location,
      mail,
    } = req.body;

    const editedPost = await Post.findById(req.params.id);
    console.log('editedPost',editedPost);
    if (editedPost) {
      const changedPost = await Post.updateOne(
        { _id: req.params.id },
        {
          $set: {
            title,
            text,
            author,
            status,
            created,
            updated,
            photo,
            price,
            phone,
            location,
            mail,
          },
        }
      );
      res.json(changedPost);
      console.log('res changePost', changedPost);
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
