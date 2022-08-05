const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * name: Food/product name (i.e. Milk, banana, hamburger)
 * date: Date/time when the food was taken 
 * calories: Calorie value (numeric value)
 * price: US collar cent based. e.g. $56.25 -> 5625
 * */
const foodEntrySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  priceCents: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

foodEntrySchema
  .virtual('price')
  .get(
    function() {return (this.priceCents / 100).toFixed(2)}
  )
  .set(
    function(price) {
      this.set({
        'priceCents': Math.ceil(Number(price) * 100),
      })
    }
  );

const FoodEntry = mongoose.model('FoodEntry', foodEntrySchema);

module.exports = FoodEntry;