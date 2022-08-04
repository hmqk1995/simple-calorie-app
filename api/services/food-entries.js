const { FoodEntry, User } = require('../models/index');

async function createFoodEntry({
  name,
  date,
  calories,
  price,
  username,
}) {
  const foodEntry = new FoodEntry({
    name,
    date,
    calories,
    price,
  });
  const user = await User.findOne({username});
  foodEntry.user = user._id;
  return await foodEntry.save();
}

async function getFoodEntries(username) {
  const user = await User.findOne({username});
  return await FoodEntry.find({
    user: user._id,
  }).sort({
    date: 'desc'
  }).exec();
}

module.exports = {
  createFoodEntry,
  getFoodEntries,
}