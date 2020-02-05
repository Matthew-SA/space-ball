const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  currency: {
    type: Number,
    default: 1000
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("User", UserSchema);
