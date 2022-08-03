const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * name: Food/product name (i.e. Milk, banana, hamburger)
 * date: Date/time when the food was taken 
 * calories: Calorie value (numeric value)
 * price: US collar cent based. e.g. $56.25 -> 5625
 * */
 const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'guest'],
    required: true,
  },
});
  
const User = mongoose.model('User', userSchema);

module.exports = User;