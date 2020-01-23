const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShipSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  color: {
    type: String,
    default: "white"
  }
});

module.exports = Ship = mongoose.model("ship", ShipSchema);