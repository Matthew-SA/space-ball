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
    type: Object,
    default: {ship: "Default", ball: "Earth"}
  }
});

module.exports = Inventory = mongoose.model('inventory', InventorySchema);