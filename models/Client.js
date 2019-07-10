const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//grouped by server instead of client
const ClientSchema = new Schema({
  storeName: {
    type: String,
    required: false
  },
  ordersArray: {
    type: Array
  },
  date: {
    type: Date,
    date: Date.now()
  }
})

module.exports = Client = mongoose.model("Client", ClientSchema);