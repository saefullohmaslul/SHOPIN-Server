const express = require("express");
require("express-group-routes");

const app = express();

const transactionController = require("./transactionController");

app.group("/api/v1/", router => {
  router.post("/transaction", transactionController.store);
  router.patch("/transaction/:transactionId", transactionController.update);
});

module.exports = app;
