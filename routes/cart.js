const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware');
const Product = require('../models/Product');
const User = require("../models/User");
//Route to see the cart
router.get('/user/cart', isLoggedIn, async (req, res) => {
    let user= await User.findById(req.user._id).populate('cart');
    const totalAmount=user.cart.reduce((sum,curr) => sum + curr.price,0);
    const productInfo = user.cart.map((p)=>p.descr).join(',');
    res.render('cart/cart.ejs',{user,totalAmount,productInfo});
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
//delete function
router.delete('user/:productID/delete', async (req, res) => {})
module.exports = router;