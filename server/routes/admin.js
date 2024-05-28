const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");

const adminControllers = require("../controllers/admin");

router.post(
  "/addProduct",
  [
    body(
      "name",
      "Please enter an Product Name with text or number!"
    ).isAlphanumeric(),
  ],
  adminControllers.addProduct
);

module.exports = router;
