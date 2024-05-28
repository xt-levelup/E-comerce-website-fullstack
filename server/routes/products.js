const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/products");

router.get("/getProducts", productControllers.getProducts);

module.exports = router;
