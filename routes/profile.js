const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Adjust the path as needed

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extract token from Bearer <token>

  if (token == null) return res.sendStatus(401); // No token provided

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token

    req.user = user; // Attach user info to request
    next();
  });
};

// GET /api/profile
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Verify that userId is present in the request
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Find the user by ID
    const user = await User.findById(req.user.userId).exec();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send user profile information
    res.json({
      name: user.name,
      email: user.email,
      profile_picture: user.profile_picture,
    });
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
