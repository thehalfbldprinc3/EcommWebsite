const Product = require('../models/Product');
const Review = require('../models/Review');

// Show all products
const showAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.render('products/index', { products });
    } catch (err) {
        res.status(500).render('error', { message: err.message });
    }
};

// Show form for new product
const productForm = (req, res) => {
    try {
        res.render('products/new');
    } catch (err) {
        res.status(500).render('error', { message: err.message });
    }
};

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, imgLink, price, descr } = req.body;
        await Product.create({ name, imgLink, price, descr, author: req.user._id });
        req.flash('success', 'Product created successfully.');
        res.redirect('/products');
    } catch (err) {
        res.status(500).render('error', { message: err.message });
    }
};

// Show specific product
const showProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const foundProduct = await Product.findById(id).populate('reviews');
        res.render('products/show', { foundProduct, msg: req.flash('msg') });
    } catch (err) {
        res.status(500).render('error', { message: err.message });
    }
};

// Show edit form
const editForm = async (req, res) => {
    try {
        const { id } = req.params;
        const foundProduct = await Product.findById(id);
        res.render('products/edit', { foundProduct });
    } catch (err) {
        res.status(500).render('error', { message: err.message });
    }
};

// Update product
const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, imgLink, price, descr } = req.body;
        await Product.findByIdAndUpdate(id, { name, imgLink, price, descr });
        req.flash('success', 'Product updated successfully.');
        res.redirect(`/product/${id}`);
    } catch (err) {
        res.status(500).render('error', { message: err.message });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        await Product.findByIdAndDelete(id);
        req.flash('success', 'Product deleted successfully.');
        res.redirect('/products');
    } catch (err) {
        res.status(500).render('error', { message: err.message });
    }
};

//search product
// const searchProduct= async (req, res)=>{
//     try{
//     const {query}= req.query;
//     if(!query){
//         req.flash('error', 'No query found.');
//     }
//     const products= await product.find({
//         name:{$regex:query, $options: 'i'}
//     });
//     res.render('products/search', {products, query});
//     }catch(err){
//         res.status(500).render('error', { message: err.message });
//     }
// }

module.exports = {
    showAllProducts,
    productForm,
    createProduct,
    showProduct,
    editForm,
    editProduct,
    deleteProduct,
    // searchProduct,
};