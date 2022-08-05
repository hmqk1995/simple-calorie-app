const userRouter = require('./users');
const foodRouter = require('./food-entries');
const reportRouter = require('./report');

module.exports = [
  userRouter,
  foodRouter,
  reportRouter,
];