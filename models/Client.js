const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//grouped by server instead of client
const ClientSchema = new Schema({
  name: {
    type: String
  },
  ordersObject: {
    type: Object
  },
  ordersCountObject: {
    type: Object
  },
  listOfClients: {
    type: Array
  },
  ordersTotalCountObject: {
    type: Object
  },
  date: {
    type: Date,
    date: Date.now()
  }
},{timestamps: true})

module.exports = Client = mongoose.model("Client", ClientSchema);