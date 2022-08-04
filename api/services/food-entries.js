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

module.exports = {
  createFoodEntry,
}