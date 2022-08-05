const { FoodEntry } = require('../models/index');

async function getDatesMeetThreshold(threshold = 2100) {
  return await FoodEntry.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$date'} },
        totalCalories: {
          $sum: '$calories',
        },
      }
    },
    {
      $addFields: { date: '$_id' }
    },
    {
      $match: {
        totalCalories: {$gte: threshold},
      }
    }
  ]);
}

module.exports = {
  getDatesMeetThreshold,
}