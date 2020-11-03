var express = require("express");
var router = express.Router();
const {
    getProductById,
    createProduct,
    getProduct,
    photo,
    removeProduct,
    updateProduct,
    getAllProducts,
    getAllUniqueCategory} = require("../controllers/product");
const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");
//params
router.param("userId", getUserById);
router.param("productId", getProductById);
//routes
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct);
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, removeProduct);
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct);
//see all products
router.get("/products", getAllProducts);
router.get("/product/categories", getAllUniqueCategory);
module.exports= router;