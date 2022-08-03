const express = require('express');
const router = express.Router();

// get all users
router.get('/users', (req, res) => {
  res.send('Get all users');
})

// Get single user
router.get('/users/:username', (req, res) => {
  res.send('Get a single user');
})

// auth the user with token
router.get('/users/:username/auth', (req, res) => {
  res.send('auth the user with token');
})


module.exports = router;