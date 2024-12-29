const express = require('express');
const router=express.Router();
const Product = require('../models/Product');
const Review = require('../models/Review');
const {validateProduct, isLoggedIn, isSeller, isProductAuth} =require('../middleware');
const flash = require('connect-flash');

//To show all the products
router.get('/products',isLoggedIn, async (req,res)=>{
    try {
        let products = await Product.find({});
        res.render('products/index', {products});
    }catch(err){
        res.status(500).render('error', {message: err.message});
    }
});
//To show the form for new products
router.get('/product/new',isLoggedIn,isSeller,(req,res)=>{
    try {
        res.render('products/new');
    }catch(err){
        res.status(500).render('error', {message: err.message});
    }
});
//To actually add the product
router.post('/products',validateProduct,isLoggedIn,isSeller,async (req,res)=>{
    try {
        let {name, imgLink, price, descr} = req.body;
        await Product.create({name, imgLink, price, descr, author:req.user._id});
        req.flash('success','Product created successfully.');
        res.redirect('/products');
    }catch(err){
        res.status(500).render('error', {message: err.message});
    }
});
//To get a page on a specific product
router.get('/product/:id',isLoggedIn,async (req,res)=>{
    try {
        let {id} = req.params;
        let foundProduct = await Product.findById(id).populate('reviews');
        res.render('products/show', {foundProduct, msg:req.flash('msg')});
    }catch(err){
        res.status(500).render('error', {message: err.message});
    }
});
//To show the edit form
router.get('/product/:id/edit',isLoggedIn,isProductAuth ,async (req,res)=>{
    try {
        let {id} = req.params;
        let foundProduct = await Product.findById(id);
        res.render('products/edit', {foundProduct});
    }catch(err){
        res.status(500).render('error', {message: err.message});
    }
});
//To actually update the DB
router.patch('/product/:id',validateProduct ,isLoggedIn,isProductAuth,async (req,res)=>{
    try {
        let {id} = req.params;
        let {name, imgLink, price, descr} = req.body;
        // console.log(req.body);
        await Product.findByIdAndUpdate((id), {name, imgLink, price, descr});
        req.flash('success', 'product updated successfully.' );
        res.redirect(`/product/${id}`);
    }catch(err){
        res.status(500).render('error', {message: err.message});
    }
})
//To delete a product entry
router.delete('/product/:id',isLoggedIn ,isProductAuth , async (req,res)=>{
    try {
        let {id} = req.params;
        const product = await Product.findById(id);
        // for(let id of product.reviews){
        //     await Review.findByIdAndDelete(id);
        // }
        await Product.findByIdAndDelete(id);
        req.flash('success', 'product deleted successfully.' );
        res.redirect('/products');
    }catch(err){
        res.status(500).render('error', {message: err.message});
    }
})
module.exports = router;
