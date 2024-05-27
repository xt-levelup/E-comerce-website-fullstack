const express = require("express");
const router = express.Router();

const adminControllers = require("../controllers/admin");

router.post("/addProduct", adminControllers.addProduct);

module.exports = router;
