const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../services/users');
const {
  createFoodEntry,
  getFoodEntries,
  getFoodEntriesForAll,
  updateFoodEntry,
  deleteFoodEntry,
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

// POST: modify an existing food entry
router.post('/food-enrties/:id', authenticateToken, async (req, res) => {
  await updateFoodEntry(req.params.id, req.body.form);
  return res.send('modified food entry successfully');
})

// DELETE: delete an existing food entry
router.delete('/food-enrties/:id', authenticateToken, async (req, res) => {
  const { role } = req.user;
  if (role === 'admin') {
    await deleteFoodEntry(req.params.id);
    return res.send('deleted food entry successfully');
  } else {
    return res.sendStatus(403);
  }
})

// GET: get all food entries for the user
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

// GET: get all food entries for all users for admin roles
router.get('/food-enrties/all', authenticateToken, async (req, res) => {
  const { role } = req.user;
  if (role === 'admin') {
    const data = await getFoodEntriesForAll();
    return res.send(
      data.map(({
        name,
        date,
        calories,
        price,
        user,
        _id,
      }) => ({
        name,
        date,
        calories,
        price,
        user,
        _id,
      }))
    );
  } else {
    return res.sendStatus(403);
  }
})

module.exports = router;