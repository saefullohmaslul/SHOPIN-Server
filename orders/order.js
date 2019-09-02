const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  menuId: {
    type: mongoose.Types.ObjectId,
    ref: "Menu"
  },
  transactionId: {
    type: mongoose.Types.ObjectId,
    ref: "Transaction"
  },
  qty: Number,
  price: Number,
  status: Boolean
});

module.exports = mongoose.model("Order", orderSchema);
