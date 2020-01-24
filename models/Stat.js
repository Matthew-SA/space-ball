const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StatSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    default: 0
  },
  wins: {
    type: Number,
    default: 0
  },
  losses: {
    type: Number,
    default: 0
  }
});

module.exports = Stat = mongoose.model('stat', StatSchema);