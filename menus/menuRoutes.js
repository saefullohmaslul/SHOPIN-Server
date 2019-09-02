const express = require("express");
require("express-group-routes");

const app = express();

const menuController = require("./menuController");

app.group("/api/v1/", router => {
  router.post("/menu", menuController.store);
  router.get("/menu", menuController.index);
});

module.exports = app;
