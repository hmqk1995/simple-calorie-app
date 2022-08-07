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
    { $project: { value: 1, average_calories: { $ceil: "$average_calories" } } },
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
  console.log(JSON.stringify(result))
}

init();
