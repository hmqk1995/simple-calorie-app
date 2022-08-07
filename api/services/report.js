const { FoodEntry } = require('../models/index');
const { getUserInfoFromUsername } = require('./users');

async function getDatesMeetThreshold(threshold = 2100, username) {
  const user = await getUserInfoFromUsername(username);
  return await FoodEntry.aggregate([
    {
      $match: {
        user: user._id,
      }
    },
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

async function getMonthsMeetSpendingLimit(limit = 1000, username) {
  const user = await getUserInfoFromUsername(username);
  return await FoodEntry.aggregate([
    {
      $match: {
        user: user._id,
      }
    },
    {
      $group: {
        _id: { $dateToString: {
          format: '%Y-%m',
          date: '$date',
          timezone: 'HST',
        } },
        totalPriceCents: {
          $sum: '$priceCents',
        },
      }
    },
    {
      $project: {
        date: 1,
        totalPrice: { $divide: [ "$totalPriceCents", 100 ] }
      }
    },
    {
      $addFields: { date: '$_id' }
    },
    {
      $match: {
        totalPrice: {$gte: limit},
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
  return [result1[0]?.count || 0, result2[0]?.count || 0];
}

/**
 * get average number of calories Added last 7 days per user
 * return [{
 *  username : string,
 *  avg_calories : number,
 * },...]
 */
 async function getUserAvgCaloriesReport() {
  const oneWeek = 7 * 60 * 60 * 24 * 1000;
  const aWeekAgo = new Date().getTime() - oneWeek;
  const result = await FoodEntry.aggregate([
    {
      $match: {
        "date": {
          "$gte": new Date(aWeekAgo),
        },
      }
    },
    {
      $group: {
        _id: "$user",
        average_calories: {
          $avg: "$calories",
        }
      },
    },
    {
      $project: {
        value: 1,
        average_calories: {
          $ceil: "$average_calories"
        }
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'user',
      }
    },
    {
      $set: {
        user: { $arrayElemAt: ["$user", 0] }
      }
    },
    {
      $set: {
        username: "$user.username",
      }
    },
    {
      $unset: "user",
    },
  ]);
  return result;
 }

module.exports = {
  getDatesMeetThreshold,
  getMonthsMeetSpendingLimit,
  getEntryReport,
  getUserAvgCaloriesReport,
}