const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Employee
const Course = new Schema(
  {
    university: {
      type: String
    },
    name: {
      type: String
    },
    level: {
      type: String
    }
  },
  {
    collection: 'courses'
  }
);
Course.virtual('info', {
  ref: 'University', // The model to use
  localField: 'university', // Find people where `localField`
  foreignField: 'name', // is equal to `foreignField`
  // If `justOne` is true, 'info' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false
});
module.exports = mongoose.model('Course', Course);
