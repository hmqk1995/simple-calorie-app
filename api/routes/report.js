const express = require('express');
const router = express.Router();

const { authenticateToken } = require('../services/users');

const { getDatesMeetThreshold } = require('../services/report');

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

module.exports = router;