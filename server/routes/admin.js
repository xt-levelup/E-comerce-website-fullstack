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
    body("initQuantity", "Please enter a Init Quantity with a number!")
      .isLength({
        min: 1,
      })
      .isNumeric(),
    body(
      "inventoryQuantity",
      "Please enter a Inventory Quantity with a number!"
    )
      .isLength({
        min: 1,
      })
      .isNumeric(),
  ],

  adminControllers.addProduct
);
router.post(
  "/editProduct",
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
  adminControllers.editProduct
);
router.post(
  "/deleteProduct",
  authCheck.checkAdmin,
  adminControllers.deleteProduct
);
router.post("/getUsers", authCheck.checkCounselor, adminControllers.getUsers);

router.post("/getChats", adminControllers.getChats);
// router.post("/getChats", authCheck.checkCounselor, adminControllers.getChats);

router.post(
  "/adminAddMessage",
  // authCheck.checkCounselor,
  [
    body("currentMessage", "Chat not be empty!").isLength({ min: 1 }),
    body("userIdChat", "Who are you want to send message?"),
  ],
  adminControllers.adminAddMessage
);
// router.post(
//   "/adminAddMessage",
//   authCheck.checkCounselor,
//   [
//     body("currentMessage", "Chat not be empty!").isLength({ min: 1 }),
//     body("userIdChat", "Who are you want to send message?"),
//   ],
//   adminControllers.adminAddMessage
// );

module.exports = router;
