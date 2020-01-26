const Product = require("../models/product");
const datauri = require("../utils/datauri");
const uploader = require("../utils/cloudinary");

module.exports = {
    getProductIndexHandler: (req, res, next) => {},
    getAllProducts: (req, res) => {
        // gets all the product
        let products = Product.find();
        products
            .then((products) => {
                if (products.length) {
                    return res.json({
                        products
                    });
                }
                return res.json({
                    errorMessage: "No Products",
                    products: []
                });
            })
            .catch((err) => {
                res.json({
                    errorMessage: "Something went wrong"
                });
            });
    },
    addNewProduct: (req, res) => {
        // adds new product to the database
        const { name, description, price, category, color } = req.body;
        console.log(req.body);
        const file = datauri(req).content;
        uploader.uploader
            .upload(file)
            .then((file) => {
                // store the data in the database
                let cloudImageUrl = file.url;
                let newProduct = Product({
                    name,
                    description,
                    price,
                    category,
                    color,
                    image: cloudImageUrl
                });
                return newProduct.save();
            })
            .then((product) => {
                res.status(200).json({
                    errorMessage: null,
                    saved: true,
                    product
                });
            })
            .catch((err) => {
                console.log(err);
            })
            .catch((err) => {
                // if a product doesnt have an image what is the point of storing it in the datbase
            });
    },

    getAProduct: (req, res) => {
        // gets a single product from the database
        const { productid } = req.params;
        Product.findById({ _id: productid })
            .then((product) => {
                if (!product) {
                    return res.json({
                        errorMessage: "No Product with id",
                        product: null
                    });
                }
                res.json({
                    errorMessage: null,
                    product: product
                });
            })
            .catch((err) => {
                res.json({
                    errorMessage: "Something went wrong",
                    product: null
                });
            });
    }
};
