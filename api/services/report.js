const { FoodEntry } = require('../models/index');

async function getDatesMeetThreshold(threshold = 2100) {
  return await FoodEntry.aggregate([
    {
      $group: {
        _id: { $dateToString: {
          format: '%Y-%m-%d',
          date: '$date',
          timezone: 'HST',
        } },
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

/**
 * get number of added entries in the last 7 days vs added entries the week before
 * return [
 *  entryLast7days : number,
 *  entryWeekBefore : number,
 * ]
 */
async function getEntryReport() {
  const oneWeek = 7 * 60 * 60 * 24 * 1000;
  const aWeekAgo = new Date().getTime() - oneWeek;
  const twoWeeksAgo = aWeekAgo - oneWeek;
  const result1 = await FoodEntry.aggregate([
    {
      $match: {
        "date": {
          "$gte": new Date(aWeekAgo),
        },
      }
    },
    {
      $group: {
        _id: 'sum',
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  const result2 = await FoodEntry.aggregate([
    {
      $match: {
        "date": {
          "$gte": new Date(twoWeeksAgo),
          "$lte": new Date(aWeekAgo),
        },
      }
    },
    {
      $group: {
        _id: 'sum',
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  return [result1[0].count, result2[0].count];
}

module.exports = {
  getDatesMeetThreshold,
  getEntryReport,
}