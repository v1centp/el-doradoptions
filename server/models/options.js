'use strict';

const mongoose = require('./index');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: new Date(),
    required: true
  },
  venue: {
    type: String,
    required: true
  }
}, { collection: 'event' });

const Event = mongoose.model('Event', eventSchema);


module.exports = Event; 