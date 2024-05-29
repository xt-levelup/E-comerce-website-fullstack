const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const Product = require("../models/product");
const deleteImageFiles = require("../util/imageRemove");
const User = require("../models/user");
const Order = require("../models/order");

exports.addProduct = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const category = req.body.category;
  const shortDesc = req.body.shortDesc;
  const longDesc = req.body.longDesc;
  const imageFiles = req.files;
  const authHeader = req.get("Authorization");
  const userId = req.body.userId;

  const errors = validationResult(req);

  console.log("name:", name);
  console.log("price:", price);
  console.log("category:", category);
  console.log("shortDesc:", shortDesc);
  console.log("longDesc:", longDesc);
  console.log("imageFiles:", imageFiles);
  console.log("authHeader:", authHeader);
  console.log("userId:", userId);

  console.log("req.userId:", req.userId);

  console.log("errors:", errors);

  if (!errors.isEmpty()) {
    res.status(422).json(errors.array()[0]);
    return;
  }
  if (!imageFiles || !imageFiles.length) {
    res.status(422).json({
      message: "Please choose images, max to 5 images!",
    });
    return;
  }

  const product = new Product({
    name: name,
    price: parseFloat(price),
    category: category,
    short_desc: shortDesc,
    long_desc: longDesc,
    imageUrls: imageFiles.map((image) => {
      return image.path;
    }),
    userId: req.userId,
  });

  product
    .save()
    .then((result) => {
      console.log("result add product:", result);
      res.status(201).json({
        message: "Add product successfully!",
      });
    })
    .catch((err) => {
      console.log("err save product:", err);
      deleteImageFiles.deleteFiles(
        imageFiles.map((image) => {
          return image.path;
        })
      );
      res.status(500).json({
        message: err.message || "Cannot add product now!",
      });
    });
};

exports.editProduct = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const category = req.body.category;
  const shortDesc = req.body.shortDesc;
  const longDesc = req.body.longDesc;
  const imageFiles = req.files;
  const authHeader = req.get("Authorization");
  const userId = req.body.userId;
  const productId = req.body.productId;
  const errors = validationResult(req);

  console.log("name:", name);
  console.log("price:", price);
  console.log("category:", category);
  console.log("shortDesc:", shortDesc);
  console.log("longDesc:", longDesc);
  console.log("imageFiles:", imageFiles);
  console.log("authHeader:", authHeader);
  console.log("userId:", userId);
  console.log("productId:", productId);
  console.log("req.userId:", req.userId);

  console.log("errors:", errors);

  if (!errors.isEmpty()) {
    res.status(422).json(errors.array()[0]);
    return;
  }
  if (!imageFiles || !imageFiles.length) {
    res.status(422).json({
      message: "Please choose images, max to 5 images!",
    });
    return;
  }

  Product.findById(productId)
    .then((product) => {
      deleteImageFiles.deleteFiles(product.imageUrls);
      product.name = name;
      product.price = parseFloat(price);
      product.category = category;
      product.short_desc = shortDesc;
      product.long_desc = longDesc;
      product.imageUrls = imageFiles.map((image) => {
        return image.path;
      });
      product.userId = req.userId;
      return product.save();
    })
    .then((result) => {
      console.log("result update product:", result);
      res.status(201).json({
        message: "Updated successfully!",
      });
    })
    .catch((err) => {
      console.log("Update product err:", err);
      res.status(500).json({
        message: "Something thing went wrong when trying edit!",
      });
    });
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  const authHeader = req.get("Authorization");

  console.log("productId:", productId);
  console.log("authHeader:", authHeader);

  Product.findByIdAndDelete(productId)
    .then((result) => {
      console.log("Result delete product:", result);
      res.status(201).json({
        message: "Deleted the product successfully!",
      });
    })
    .catch((err) => {
      console.log("err delete product:", err);
      res.status(500).json({ message: err.message });
    });
};

exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      // res.status(200).json(users);
      return users;
    })
    .then((users) => {
      Order.find()
        .then((orders) => {
          res.status(200).json({
            users: users,
            orders: orders,
          });
        })
        .catch((err) => {
          console.log("err Order.find:", err);
          res.status(500).json({
            message: err.message,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
      console.log("Err getUsers:", err);
    });
};
