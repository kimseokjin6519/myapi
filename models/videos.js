const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  videoID: {
    type: String,
    required: true,
    unique: true
  },
  tag: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
