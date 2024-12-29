const express = require('express');
const router=express.Router();//mini instance
const Review = require('../models/Review');
const Product = require('../models/Product');
const {validateReview, isLoggedIn} = require("../middleware");
const flash = require("connect-flash");

router.post('/products/:id/review',validateReview,isLoggedIn, async (req, res) => {
    try {
        const {id} = req.params;
        const {rating, comment} = req.body;
        const product = await Product.findById(id);
        const review = new Review({rating, comment});
        product.reviews.push(review);
        await review.save();
        await product.save();
        req.flash('success', 'Review added successful');
        res.redirect(`/product/${id}`);
    }catch(err){
        res.status(500).render('error', {message: err.message});
    }
});

router.delete('/products/:productID/review/:reviewID', isLoggedIn, async (req,res)=>{
    try {
        const {productID, reviewID} = req.params;
        await Review.findByIdAndDelete(reviewID);
        await Product.findByIdAndUpdate(productID, {
            $pull: {reviews: reviewID}
        })
        req.flash('success', 'Review deleted successfully');
        res.redirect(`/product/${productID}`);
    }catch(err){
        res.status(500).render('error', {message: err.message});
    }
})

module.exports = router;
