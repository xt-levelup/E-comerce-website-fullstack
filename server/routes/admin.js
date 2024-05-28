const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");
const authCheck = require("../middleware/authCheck");

const adminControllers = require("../controllers/admin");

router.post(
  "/addProduct",
  authCheck.checkAdmin,
  [
    body("name", "Please enter a Product Name at least 3 chars!").isLength({
      min: 3,
    }),
    body("price", "Please enter a Price with a number!")
      .isLength({
        min: 1,
      })
      .isNumeric(),
    body("category", "Please enter a Category!").isLength({
      min: 1,
    }),
    body(
      "shortDesc",
      "Please enter a Short Description and at least 3 chars!"
    ).isLength({
      min: 3,
    }),
    body(
      "longDesc",
      "Please enter a Long Description and at least 3 chars!"
    ).isLength({
      min: 3,
    }),
  ],

  adminControllers.addProduct
);

module.exports = router;