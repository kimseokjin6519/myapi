const express = require('express');
const router = express.Router();
const Video = require('../models/videos');

router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/search', async (req, res) => {
  try {
    const keywords = req.query.keywords ? req.query.keywords.split(',').map(k => k.trim()).filter(Boolean) : [];

    if (keywords.length === 0) {
      const videos = await Video.find();
      return res.json(videos);
    }
    const searchQueries = keywords.map(keyword => ({
      title: new RegExp(`\\b${keyword}\\b`, 'i')
    }));
    const videos = await Video.find({ $or: searchQueries });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
