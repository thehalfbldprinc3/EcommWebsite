const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware');
const Product = require('../models/product');
const User = require("../models/User");
//Route to see the cart
router.get('/user/cart', isLoggedIn, async (req, res) => {
    let user= await User.findById(req.user._id).populate('cart');
    res.render('cart/cart.ejs',{user});
})

router.post('/user/:productID/add', async (req, res) => {
    let {productID} = req.params;
    let userID = req.user.id;
    let product = await Product.findById(productID);
    let user =  await User.findById(userID);
    user.cart.push(product);
    await user.save();
    res.redirect('/user/cart');
})

module.exports = router;