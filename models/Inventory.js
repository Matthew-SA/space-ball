const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  username: {
    type: String,
    required: true
  },
  currency: {
    type: Number,
    default: 1000
  },
  ships: {
    type: Array,
    default: ["Default"]
  },
  balls: {
    type: Array,
    default: ["Earth"]
  },
  gameoptions: {
    type: Array,
    default: ["Default", "Earth"]
  }
});

module.exports = Inventory = mongoose.model('inventory', InventorySchema);