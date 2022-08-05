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
  console.log(await FoodEntry.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$date'} },
        totalCalories: {
          $sum: '$calories',
        }
      }
    },
    {
      $match: {
        totalCalories: {$gte: 300},
      }
    }
  ]));
}

init();
