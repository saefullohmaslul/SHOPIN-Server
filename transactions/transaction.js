const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  tableNumber: Number,
  finishedTime: String,
  subTotal: Number,
  discount: Number,
  serviceCharge: Number,
  tax: Number,
  total: Number,
  isPaid: Boolean
});

module.exports = mongoose.model("Transaction", transactionSchema);
