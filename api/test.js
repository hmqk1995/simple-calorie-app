require('dotenv').config();
const mongoose = require('mongoose');
const { FoodEntry } = require('./models/index');

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);

const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

async function init() {
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

init();
