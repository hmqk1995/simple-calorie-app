const express = require('express');
const router = express.Router();
const {
  generateAccessToken,
  authenticateToken,
  createUser,
  getUserInfoFromUsername,
} = require('../services/users');

// get all users
router.get('/users', (req, res) => {
  return res.send('Get all users');
});

// Get single user
router.get('/users/:username', authenticateToken, async (req, res) => {
  const { role, username } = req.user;
  // if admin, can see all users
  if (
    role === 'admin' ||
    (role === 'guest' && req.params.username === username)
  ) {
    return res.json(await getUserInfoFromUsername(req.params.username));
  }
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
router.post('/users/:username/auth', async (req, res) => {
  const token = await generateAccessToken({
    username: req.params.username,
  });
  if (token === false) {
    return res.sendStatus(403);
  }
  return res.json(token);
});

module.exports = router;