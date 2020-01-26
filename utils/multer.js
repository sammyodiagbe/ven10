const multer = require("multer");

module.exports = multer({}).single("image");
