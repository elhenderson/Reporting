const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServerSchema = new Schema({
  _id: {
    type: String
  }
})

module.exports = Server = mongoose.model("Server", ServerSchema);