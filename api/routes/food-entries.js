const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../services/users');
const { createFoodEntry } = require('../services/food-entries');

// POST: add a new food entry
router.post('/food-enrties', authenticateToken, async (req, res) => {
  const { username } = req.user;
  const {
    name,
    date,
    calories,
    price
  } = req.body;
  const response = await createFoodEntry({
    name,
    date,
    calories,
    price,
    username,
  });
  console.log(response)
  return res.json(response);
})

// GET: get all food entries
router.get('/food-enrties', authenticateToken, (req, res) => {
  return res.send('Get all food entries');
})

// GET: get single food entry
router.get('/food-enrties/:foodId', authenticateToken, (req, res) => {
  return res.send('Get a single food entry');
})

module.exports = router;