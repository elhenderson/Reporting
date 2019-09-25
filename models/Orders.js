const mongoose = require('mongoose');
const objectId = mongoose.objectId;
const Schema = mongoose.Schema;

//grouped by server instead of client
const OrdersSchema = new Schema({
  orderNumber: { type: String, required: false},
  company: { type: String, required: true},
  provider: { type: String, required: false},
  processedDate: { type: String, required: false},
  orderDate: { type: Date, required: false},
  createdAt: {type: Date, default: Date.now}
}, {
  timestamps: true
})

module.exports = orders = mongoose.model("orders", OrdersSchema);