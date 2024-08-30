const express = require('express');
const router = express.Router();
const Video = require('../models/videos');

// Get all videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/*
// Get a specific video by ID
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json(video);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Create a new video
router.post('/', async (req, res) => {
  const video = new Video({
    title: req.body.title,
    thumbnail: req.body.thumbnail,
    videoID: req.body.videoID,
    tag: req.body.tag
  });

  try {
    const newVideo = await video.save();
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a video by ID
router.put('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    video.title = req.body.title || video.title;
    video.thumbnail = req.body.thumbnail || video.thumbnail;
    video.videoID = req.body.videoID || video.videoID;
    video.tag = req.body.tag || video.tag;

    const updatedVideo = await video.save();
    res.json(updatedVideo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a video by ID
router.delete('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    await video.remove();
    res.json({ message: 'Video deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
*/

module.exports = router;
