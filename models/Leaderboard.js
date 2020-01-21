const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeaderboardSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
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

module.exports = Leaderboard = mongoose.model("leaderboard", LeaderboardSchema);