const express = require('express');
const router = express.Router();
const { generateAccessToken } = require('../services/users');

// get all users
router.get('/users', (req, res) => {
  res.send('Get all users');
});

// Get single user
router.get('/users/:username', (req, res) => {
  res.send('Get a single user');
});

// send authtoken to the user
router.post('/users/:username/auth', (req, res) => {
  const token = generateAccessToken({ username: req.params.username });
  res.json(token);
});

module.exports = router;