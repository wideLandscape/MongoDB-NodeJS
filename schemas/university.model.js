const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Employee
const University = new Schema(
  {
    country: {
      type: String
    },
    city: {
      type: String
    },
    name: {
      type: String
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    students: {
      type: [{ year: { type: Number }, number: { type: Number } }]
    }
  },
  {
    collection: 'universities'
  }
);

module.exports = mongoose.model('University', University);
