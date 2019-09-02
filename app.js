const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("mongoose");

const transactionRoutes = require("./transactions/transactionRoutes");
const menuRoutes = require("./menus/menuRoutes");
const orderRoutes = require("./orders/orderRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URI = `mongodb://localhost:27017/shopin`;

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("images"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter
  }).array("images")
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(transactionRoutes);
app.use(menuRoutes);
app.use(orderRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.status || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => {
    app.listen(PORT, err => {
      if (err) throw err;
      console.log(`Server running on port ${PORT}`);
    });
  });
