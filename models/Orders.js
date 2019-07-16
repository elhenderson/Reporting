const mongoose = require('mongoose');
const objectId = mongoose.objectId;
const Schema = mongoose.Schema;

//grouped by server instead of client
const OrdersSchema = new Schema({
  localStatus: { type: String, required: false},
  orderNumber: { type: String, required: true},
  channelOrderID: { type: String, required: false},
  storeName: { type: String, required: true},
  trackingNumber: { type: String, required: false},
  provider: { type: String, required: false},
  serviceUsed: { type: String, required: false},
  processedDate: { type: String, required: false},
  isManual: { type: Boolean, required: false},
  orderDate: { type: Date, required: false},
  createdAt: {type: Date, default: Date.now, expires: "30d"}
}, {
  timestamps: true
})

module.exports = orders = mongoose.model("orders", OrdersSchema);