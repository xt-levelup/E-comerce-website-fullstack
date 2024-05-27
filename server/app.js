const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const compression = require("compression");
const fs = require("fs");
const path = require("path");
const https = require("https");
const helmet = require("helmet");

// const Session = require("./models/session");

require("dotenv").config();

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
// const productRoutes = require("./routes/products");

const mongodbUrl = process.env.MONGODB_URL;

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

const app = express();

app.use("/images", express.static("images"));

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
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

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(bodyParser.json());

app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).array("imageFiles", 5)
);

app.use(helmet());
app.use(compression());
app.use(morgan("combined", { stream: accessLogStream }));

app.use(authRoutes);
app.use(adminRoutes);
// app.use(productRoutes);

mongoose
  .connect(mongodbUrl)
  .then((result) => {
    console.log("server connected!");
    app.listen(5000);
  })
  .catch((err) => {
    console.log("mongoose connect err:", err);
  });
