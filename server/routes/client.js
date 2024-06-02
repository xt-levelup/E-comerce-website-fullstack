const express = require("express");
const router = express.Router();

const authCheck = require("../middleware/authCheck");
const clientControllers = require("../controllers/client");
const { check, body } = require("express-validator");

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
router.post(
  "/removeCartItem",
  authCheck.checkToken,
  clientControllers.removeCartItem
);
router.post("/updateCart", authCheck.checkToken, clientControllers.updateCart);
router.post(
  "/userOrder",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter an valid and real email!"),
    body("name", "Please enter a name!").isLength({ min: 1 }),
    // .isAlphanumeric()
    body("address", "Please enter a real address for shipping!").isLength({
      min: 1,
    }),
    // .isAlphanumeric()
    body("phone", "Please enter a number, a real phone for shipping!")
      .isLength({ min: 1 })
      .isNumeric(),
  ],
  authCheck.checkToken,
  clientControllers.userOrder
);

module.exports = router;
