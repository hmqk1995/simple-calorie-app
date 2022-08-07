const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../services/users');

const {
  getDatesMeetThreshold,
  getEntryReport,
  getUserAvgCaloriesReport,
} = require('../services/report');

// GET: get dates that meet calorie threshold
router.get('/report/thresholds/:number', authenticateToken, async (req, res) => {
  const data = await getDatesMeetThreshold(Number(req.params.number));
  return res.json(
    data.map(({date, totalCalories}) => ({
      date,
      totalCalories,
    }))
  );
});

// GET: number of added entries in the last 7 days vs added entries the week before
// admin view only
router.get('/report/entries', authenticateToken, async (req, res) => {
  let { role } = req.user;
  if (role === 'admin') {
    const data = await getEntryReport();
    return res.json({
      data,
    });
  } else {
    return res.sendStatus(403);
  }
});

// GET: average number of calories Added last 7 days per user
// admin view only
router.get('/report/users/calories/avg', authenticateToken, async (req, res) => {
  let { role } = req.user;
  if (role === 'admin') {
    const data = await getUserAvgCaloriesReport();
    return res.json({
      data,
    });
  } else {
    return res.sendStatus(403);
  }
});


module.exports = router;