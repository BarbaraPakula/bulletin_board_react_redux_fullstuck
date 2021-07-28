/* eslint-disable linebreak-style */
const express = require('express');
const router = express.Router();
const upload = require('./../config/upload');
const Post = require('../models/post.model');
require('./../config/upload');

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
    console.log('res', result);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/posts/add', upload.single('photo'), async (req, res) => {
  try {
    const {
      author,
      created,
      updated,
      status,
      title,
      text,
      price,
      phone,
      location,
    } = req.body;

    let photoSrc;
    if (req.file) {
      const { filename } = req.file;
      photoSrc = 'uploads/' + filename;
    } else {
      photoSrc = '';
    }
    const pattern = new RegExp(
      /(<\s*(strong|em)*>(([A-z]|\s)*)<\s*\/\s*(strong|em)>)|(([A-z]|\s|\.)*)/,
      'g'
    );
    const titleMatched = (title.match(pattern) || []).join('');
    const locationMatched = (location.match(pattern) || []).join('');
    const emailPattern = new RegExp(
      '^[a-zA-Z0-9][a-zA-Z0-9_.-]+@[a-zA-Z0-9][a-zA-Z0-9_.-]+.{1,3}[a-zA-Z]{2,4}'
    );
    const validatedEmail = emailPattern.test(author);

    if (titleMatched.length < title.length)
      throw new Error('Invalid characters in the title...');

    if (location && locationMatched.length < location.length)
      throw new Error('Invalid characters in the location...');

    if (!validatedEmail) throw new Error('Wrong email!');

    if (text.length < 20 || title.length < 10)
      throw new Error('The text is too short');
    if (title && text && author && status) {
      const newPost = new Post({
        author: author,
        created: created,
        updated: updated,
        status: status,
        title: escape(title),
        text: escape(text),
        photo: photoSrc,
        price: price,
        phone: phone,
        location: escape(location),
      });
      await newPost.save();
      res.json({ message: 'OK' });
    } else {
      throw new Error('Wrong input!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put(`/posts/:id/edit`, upload.single('phot'), async (req, res) => {
  try {
    const {
      title,
      text,
      author,
      created,
      updated,
      status,
      price,
      phone,
      location,
    } = req.body;

    console.log('req.body', req.body);

    const authorPattern = new RegExp(
      '^[a-zA-Z0-9][a-zA-Z0-9_.-]+@[a-zA-Z0-9][a-zA-Z0-9_.-]+.{1,3}[a-zA-Z]{2,4}'
    );
    const contentPattern = new RegExp(/(.)*/, 'g');

    const authorMatched = (author.match(authorPattern) || []).join('');
    const titleMatched = (title.match(contentPattern) || []).join('');
    const textMatched = (text.match(contentPattern) || []).join('');

    if (
      authorMatched.length < author.length &&
      titleMatched.length < title.length &&
      textMatched.length < text.length
    ) {
      throw new Error('Wrong characters used!');
    }
    if (title.length < 10) {
      throw new Error('Too short title (min. 10 characters)');
    }
    if (text.length < 20) {
      throw new Error('Too short text (min. 20 characters)');
    }

    if (
      authorMatched.length === author.length &&
      titleMatched.length === title.length &&
      textMatched.length === text.length
    ) {
      let newNameFile = req.body.photo;
      let fileNameExt;

      if (req.file !== undefined) {
        newNameFile = req.file.filename;
        const filePath = req.file.path;
        console.log('filePath', filePath);
        fileNameExt = filePath.split('.').slice(-1)[0];
        if (
          fileNameExt !== 'jpg' &&
          fileNameExt !== 'png' &&
          fileNameExt !== 'gif'
        ) {
          throw new Error('Wrong format file');
        }
      }
      console.log('newNameFile', newNameFile);
      console.log('fileNameExt', fileNameExt);

      const editedPost = await Post.findById(req.body._id);
      console.log('editedPost', editedPost);
      if (editedPost) {
        const changedPost = await Post.updateOne(
          { _id: req.body._id },
          {
            $set: {
              title,
              text,
              author,
              status,
              created,
              updated,
              photo: newNameFile,
              price,
              phone,
              location,
            },
          }
        );
        res.json(changedPost);
      } else {
        throw new Error('Something wrong!');
      }
    } else {
      throw new Error('Wrong input!');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
