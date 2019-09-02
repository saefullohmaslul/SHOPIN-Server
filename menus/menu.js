const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menusSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  uri: String,
  categories: String
});

module.exports = mongoose.model("Menu", menusSchema);
