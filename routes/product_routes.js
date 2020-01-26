const express = require("express");
const multer = require("../utils/multer");

const router = express.Router();
const { getAProduct, getAllProducts, addNewProduct } = require("../handlers/product_handlers");

// / gets all products and display
// router.get("/", getProductIndexHandler);

// get add new product
router.get("/products", getAllProducts);

// get single product from the database
router.get("/get-product/:productid", getAProduct);

// post get new product
router.post("/add-new-product", multer, addNewProduct);

module.exports = router;
