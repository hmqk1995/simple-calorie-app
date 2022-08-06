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

// get all food entries for a specfic user
async function getFoodEntries(username) {
  const user = await User.findOne({username});
  return await FoodEntry.find({
    user: user._id,
  }).sort({
    date: 'desc'
  }).exec();
}

// get all food entries for all users (admin)
async function getFoodEntriesForAll() {
  return await FoodEntry.find({}).sort({
    date: 'desc'
  }).populate('user').exec();
}

// update a single food entry
async function updateFoodEntry(_id, form) {
  const entry = await FoodEntry.findById(_id);
  for (let key in form) {
    entry[key] = form[key];
  }
  await entry.save();
}

async function deleteFoodEntry(_id) {
  await FoodEntry.deleteOne({_id});
}

module.exports = {
  createFoodEntry,
  getFoodEntries,
  getFoodEntriesForAll,
  updateFoodEntry,
  deleteFoodEntry,
}