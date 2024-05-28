const fs = require("fs");

const deleteFiles = (arrayPath) => {
  for (let i = 0; i < arrayPath.length; i++) {
    fs.unlink(arrayPath[i], (err) => {
      if (err) {
        throw err;
      }
    });
  }
};

exports.deleteFiles = deleteFiles;
