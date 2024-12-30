const express = require('express');
const router = express.Router();
const {
    showAllProducts,
    productForm,
    createProduct,
    showProduct,
    editForm,
    editProduct,
    deleteProduct
} = require('../controllers/product');
const { validateProduct, isLoggedIn, isSeller, isProductAuth } = require('../middleware');
const flash = require('connect-flash');

// Routes
//show all products
router.get('/products', isLoggedIn, showAllProducts);
//show new product form
router.get('/product/new', isLoggedIn, isSeller, productForm);
//actually add product to db
router.post('/products', validateProduct, isLoggedIn, isSeller, createProduct);
// show specific product page
router.get('/product/:id', isLoggedIn, showProduct);
//show edit form for a product
router.get('/product/:id/edit', isLoggedIn, isProductAuth, editForm);
//actually update the data of the db
router.patch('/product/:id', validateProduct, isLoggedIn, isProductAuth, editProduct);
//delete product
router.delete('/product/:id', isLoggedIn, isProductAuth, deleteProduct);

module.exports = router;