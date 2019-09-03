const Transaction = require("./transaction");

exports.store = async (req, res, next) => {
  const { tableNumber } = req.body;
  try {
    const transaction = new Transaction({
      tableNumber
    });

    const result = await transaction.save();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const transactionId = req.params.transactionId;

  const {
    subTotal,
    discount,
    serviceCharge,
    tax,
    totalPrice,
    isPaid,
    finishedTime
  } = req.body;

  try {
    const transaction = await Transaction.findOne({ _id: transactionId });
    if (!transaction) {
      const error = new Error("Failed");
      error.data = "Transaction not found";
      error.status = 404;
      throw error;
    }

    transaction.total = totalPrice;
    transaction.subTotal = subTotal;
    transaction.discount = discount;
    transaction.serviceCharge = serviceCharge;
    transaction.tax = tax;
    transaction.isPaid = isPaid;
    transaction.finishedTime = finishedTime;

    await transaction.save();

    res.status(200).json({ transaction });
  } catch (error) {
    next(error);
  }
};
