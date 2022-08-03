const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../services/users');

// POST: add a new food entry
router.post('/food-enrties', (req, res) => {
  res.send('Add a new food entry');
})

// GET: get all food entries
router.get('/food-enrties', authenticateToken, (req, res) => {
  res.send('Get all food entries');
})

// GET: get single food entry
router.get('/food-enrties/:foodId', (req, res) => {
  res.send('Get a single food entry');
})

module.exports = router;