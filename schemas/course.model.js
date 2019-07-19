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

module.exports = mongoose.model('Course', Course);
