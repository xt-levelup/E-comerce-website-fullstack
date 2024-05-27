const jwt = require("jsonwebtoken");

exports.addProduct = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const category = req.body.category;
  const shortDesc = req.body.shortDesc;
  const longDesc = req.body.longDesc;
  const imageFiles = req.files;
  const authHeader = req.get("Authorization");
  const imageFilePaths = imageFiles.map((file) => {
    return file.path;
  });

  console.log("name:", name);
  console.log("price:", price);
  console.log("category:", category);
  console.log("shortDesc:", shortDesc);
  console.log("longDesc:", longDesc);
  console.log("imageFilePaths:", imageFilePaths);
  console.log("authHeader:", authHeader);

  res.status(201).json({
    message: "Upload OK!",
  });
};
