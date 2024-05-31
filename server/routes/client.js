const express = require("express");
const router = express.Router();

const authCheck = require("../middleware/authCheck");
const clientControllers = require("../controllers/client");

router.post("/addMessage", clientControllers.addMessage);
// router.post("/addMessage", authCheck.checkToken, clientControllers.addMessage);
router.post(
  "/getChatDataClient",

  clientControllers.getChatDataClient
);
router.post("/deleteMessageSession", clientControllers.deleteMessageSession);

router.post(
  "/clientAddToCart",
  authCheck.checkToken,
  clientControllers.clientAddToCart
);

router.post("/getCart", authCheck.checkToken, clientControllers.getCart);

module.exports = router;
