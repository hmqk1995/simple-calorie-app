const express = require('express');
const router = express.Router();
const { generateAccessToken, createUser } = require('../services/users');

// get all users
router.get('/users', (req, res) => {
  return res.send('Get all users');
});

// Get single user
router.get('/users/:username', (req, res) => {
  return res.send('Get a single user');
});

// Create a new user
router.post('/users/create', async (req, res) => {
  try {
    await createUser({
      username: req.body.username,
      role: req.body.role || 'guest',
    });
  } catch (error) {
    console.log(error);
    return res.send(error.message);
  }

  return res.send('Create a new user');
});

// send authtoken to the user
router.post('/users/:username/auth', (req, res) => {
  const token = generateAccessToken({ username: req.params.username });
  return res.json(token);
});

module.exports = router;