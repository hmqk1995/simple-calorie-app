const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../services/users');
const {
  createFoodEntry,
  getFoodEntries,
} = require('../services/food-entries');

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
  return res.json(response);
})

// GET: get all food entries
router.get('/food-enrties', authenticateToken, async (req, res) => {
  const { username } = req.user;
  const data = await getFoodEntries(username);
;
  return res.send(
    data.map(({name, date, calories, price}) => ({
      name,
      date,
      calories,
      price,
    }))
  );
})

// GET: get single food entry
router.get('/food-enrties/:foodId', authenticateToken, (req, res) => {
  return res.send('Get a single food entry');
})

module.exports = router;