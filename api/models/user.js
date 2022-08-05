const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * username: user identification
 * role: admin/guest
 * calorieThreshold: Calorie threshold value for the user (numeric value)
 * */
 const CalorieThresholdDefault = 2100;

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
  calorieThreshold: {
    type: Number,
    default: CalorieThresholdDefault,
  }
});
  
const User = mongoose.model('User', userSchema);

module.exports = User;