const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//grouped by server instead of client
const ClientSchema = new Schema({
  _id: {
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
})

module.exports = Client = mongoose.model("Client", ClientSchema);