const mongoose = require('mongoose');

const journeySchema = new mongoose.Schema({
  startPlace: {
    type: String,
    required: [true, 'please provide a start place'],
  },
  endPlace: {
    type: String,
    required: [true, 'please provide a end place'],
  },
  startDate: {
    type: Date,
    required: [true, 'please provide a start date'],
  },
  endDate: {
    type: Date,
    required: [true, 'please provide a end date'],
  },
  transportType: {
    type: String,
    required: [true, 'please provide a transport type'],
  },
  length: String,
  journeyType: String,
  items: Array,
  people: Array,
});

module.exports = journeySchema;
