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
  const limit = 1000;
  const result = await FoodEntry.aggregate([
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
  console.log(JSON.stringify(result))
}

init();
