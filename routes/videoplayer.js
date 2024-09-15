const express = require('express');
const router = express.Router();
const Video = require('../models/videos');

router.get('/', async (req, res) => {
  const { videoID } = req.query;
  try {
    const video = await Video.findOne({ videoID: videoID });
    if (video) {
      res.json({
        title: video.title,
        thumbnail: video.thumbnail,
        videoID: video.videoID,
        tag: video.tag
      });
    } else {
      res.status(404).json({ message: 'Video not found' });
    }
  } catch (error) {
    console.error('Error fetching video details:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
