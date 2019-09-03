const Menu = require("./menu");

exports.index = async (req, res, next) => {
  try {
    const menu = await Menu.find();
    if (!menu) {
      const error = new Error("Failed");
      error.data = "Menu not found, please add menu before launch the app";
      error.status = 404;
      throw err;
    }
    res.status(200).json(menu);
  } catch (error) {
    next(error);
  }
};

exports.store = async (req, res, next) => {
  try {
    const menu = new Menu(req.body);
    const result = await menu.save();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
