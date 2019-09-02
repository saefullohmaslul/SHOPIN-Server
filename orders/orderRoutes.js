const express = require("express");
require("express-group-routes");

const app = express();

const orderController = require("./orderController");

app.group("/api/v1/", router => {
  router.get("/orders", orderController.index);
  router.get("/order/:transactionId", orderController.show);
  router.post("/order", orderController.store);
  router.patch("/order/:transactionId", orderController.update);
});

module.exports = app;
