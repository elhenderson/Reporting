const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  name: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    date: Date.now()
  },
  totalCount: {
    type: Number,
    required: true
  }
})

module.exports = Client = mongoose.model("Client", ClientSchema);