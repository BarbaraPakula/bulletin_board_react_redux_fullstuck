/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: { type: String, required: true, ref: 'User' },
  created: { type: Date, required: true },
  updated: { type: Date},
  status: { type: String, required: true },
  title: { type: String, required: true, minLength: 10, maxLength: 30 },
  text: { type: String, required: true, minLength: 20, maxLength: 100 },
  photo: { type: String },
  price: { type: Number },
  phone: { type: String },
  location: { type: String },
  mail: { type: String },
  // src: { type: String, required: true },
});

module.exports = mongoose.model('Post', postSchema);
