const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * name: Food/product name (i.e. Milk, banana, hamburger)
 * date: Date/time when the food was taken 
 * calories: Calorie value (numeric value)
 * price: US collar cent based. e.g. $56.25 -> 5625
 * */
const foodEntrySchema = new Schema({
  name: String,
  date: Date,
  calories: Number,
  price: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const FoodEntry = mongoose.model('FoodEntry', foodEntrySchema);

module.exports = FoodEntry;