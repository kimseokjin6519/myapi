const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // No token, unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token, forbidden
    req.user = user;
    next();
  });
};

// Endpoint to check authentication status
router.get('/', authenticateToken, (req, res) => {
  // If the token is valid and the middleware passes, user is authenticated
  res.json({ authenticated: true });
});

module.exports = router;
