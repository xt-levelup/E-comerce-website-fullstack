const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.checkToken = (req, res, next) => {
  const getAuth = req.get("Authorization");

  if (!getAuth) {
    res.status(401).json({
      message: "Not authenticated!",
    });
    return;
  }
  const token = getAuth.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "supersecretxt");
  } catch (err) {
    console.log("err decoded token:", err);
    res.status(500).json({
      message: "Cannot complete your task now! Please login again!",
    });
    return;
  }

  if (!decodedToken) {
    res.status(401).json({
      message: "Wrong token!",
    });
    return;
  }
  req.userId = decodedToken.userId;
  next();
};

exports.checkAdmin = (req, res, next) => {
  const getAuth = req.get("Authorization");

  if (!getAuth) {
    res.status(401).json({
      message: "Not authenticated!",
    });
    return;
  }
  const token = getAuth.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "supersecretxt");
  } catch (err) {
    console.log("err decoded token:", err);
    console.log("err.message decoded token:", err.message);
    res.status(500).json({ message: err.message });
    return;
  }

  if (!decodedToken) {
    res.status(401).json({
      message: "Wrong token!",
    });
    return;
  }
  req.userId = decodedToken.userId;
  User.findById(req.userId)
    .then((user) => {
      if (user.userType !== "admin") {
        res.status(404).json({
          message: "You are not administrator! Choose another task!",
        });
        return;
      }
      next();
    })
    .catch((err) => {
      console.log("err user find id:", err);
      res.status(500).json({
        message: err.message,
      });
    });
};
