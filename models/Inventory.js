const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  username: {
    type: String,
    required: true
  },
  ships: {
    type: Array,
    default: ["Default"]
  },
  balls: {
    type: Array,
    default: ["Earth"]
  },
  selected: {
    type: Array,
    default: ["Default", "Earth"]
  }
});

module.exports = Inventory = mongoose.model('inventory', InventorySchema);