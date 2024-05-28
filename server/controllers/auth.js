const User = require("../models/user");
const Session = require("../models/session");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.postSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const phone = req.body.phone;
  const userType = req.body.userType;

  const errors = validationResult(req);

  console.log("name:", name);
  console.log("email:", email);
  console.log("password:", password);
  console.log("confirmPassword:", confirmPassword);
  console.log("phone:", phone);
  console.log("userType:", userType);
  console.log("errors:", errors);
  //   console.log("errors.array()[0].msg:", errors.array()[0].msg);

  if (!errors.isEmpty()) {
    console.log("error");
    res.status(422).json(errors.array()[0]);
    return;
  }

  bcrypt
    .hash(password, 12)
    .then((hashPassword) => {
      const user = new User({
        email: email,
        password: hashPassword,
        name: name,
        phone: phone,
        userType: userType,
        cart: { items: [] },
      });
      return user.save();
    })
    .then((result) => {
      console.log("result signup:", result);
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log("err signup:", err);
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);

  console.log("email login:", email);
  console.log("password login:", password);
  console.log("errors login:", errors);

  if (!errors.isEmpty()) {
    res.status(422).json(errors.array()[0]);
    return;
  }

  User.findOne({ email: email })
    .then((user) => {
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id.toString(),
        },
        process.env.SECRET_JWT,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        email: user.email,
        userId: user._id.toString(),
      });
    })
    .catch((err) => {
      console.log("err login:", err);
      res.status(500).json({
        message: "Something went wrong!",
      });
    });
};
