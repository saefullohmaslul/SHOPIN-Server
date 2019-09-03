const Order = require("./order");
const Menu = require("../menus/menu");

exports.index = async (req, res, next) => {
  try {
    const orders = await Order.find().populate("menu._id");
    if (!orders) {
      const error = new Error("Failed");
      error.data = "Orders not found";
      error.status = 404;
      throw error;
    }
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

exports.show = async (req, res, next) => {
  const transactionId = req.params.transactionId;

  try {
    const orders = await Order.find({ transactionId }).populate("menuId");
    if (!orders) {
      const error = new Error("Failed");
      error.data = "Orders not found";
      error.status = 404;
      throw error;
    }

    let subTotal = 0;
    orders.map(order => {
      subTotal = subTotal + order.price;
    });

    const serviceCharge = 0.055 * subTotal;
    const tax = 0.1 * subTotal;
    const totalPrice = subTotal + serviceCharge + tax;

    res.status(200).json({ orders, subTotal, serviceCharge, tax, totalPrice });
  } catch (error) {
    next(error);
  }
};

exports.store = async (req, res, next) => {
  const datas = req.body;
  let order;
  try {
    datas.map(async data => {
      const menu = await Menu.findOne({ _id: data.menuId });
      let calculatePrice = menu.price * data.qty;

      order = new Order({
        menuId: data.menuId,
        transactionId: data.transactionId,
        qty: data.qty,
        price: calculatePrice,
        status: data.status
      });
      await order.save();
    });

    res.status(200).json({
      message: "success"
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  const { status } = req.body;
  const transactionId = req.params.transactionId;

  try {
    const orders = await Order.find({ transactionId }).populate("menuId");

    orders.map((order, index) => {
      orders[index].status = status;
      order.save();
    });

    let subTotal = 0;
    orders.map(order => {
      subTotal = subTotal + order.price;
    });

    const serviceCharge = 0.055 * subTotal;
    const tax = 0.1 * subTotal;
    const totalPrice = subTotal + serviceCharge + tax;

    res.status(200).json({ orders, subTotal, serviceCharge, tax, totalPrice });
  } catch (error) {
    next(error);
  }
};
