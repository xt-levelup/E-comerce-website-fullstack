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
// router.post(
//   "/getChatDataClient",
//   authCheck.checkToken,
//   clientControllers.getChatDataClient
// );

module.exports = router;
