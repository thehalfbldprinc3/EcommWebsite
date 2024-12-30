const {productSchema, reviewSchema}= require('./schema');
const Product = require("./models/Product");
const Review = require("./models/Review");

const validateProduct = (req, res, next) => {
    let {name, imgLink, price, descr}=req.body;
    const {error, value} = productSchema.validate({name, imgLink, price, descr});
    if(error){
        return res.status(500).render('error', {err: error});
    }
    next();
}
const validateReview = (req, res, next) => {
    const {rating, comment}=req.body;
    const {error, value} = reviewSchema.validate({rating, comment});
    if(error){
        return res.status(500).render('error', {err: error});
    }
    next();
}

const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.flash('error', 'You are not logged in');
        return res.status(401).redirect('/login');
    }
    next();
}

const isSeller = (req, res, next) => {
    if(!req.user.role){
        req.flash('error', 'You dont have permission to use this action.');
        return res.status(401).redirect('/products');
    }else if(req.user.role !== 'seller'){
        req.flash('error', 'You dont have permission to use this action.');
        return res.status(401).redirect('/products');
    }
    next();
}

const isProductAuth = async (req, res, next) => {
    try {
        const { id } = req.params; // Correct parameter name
        const foundProduct = await Product.findById(id); // Await the asynchronous call
        if (!foundProduct) {
            req.flash('error', 'Product not found');
            return res.status(404).redirect('/products'); // Handle case where product doesn't exist
        }
        if (!foundProduct.author.equals(req.user._id)) { // Check ownership
            req.flash('error', 'You are not authorized to perform this action');
            return res.status(403).redirect('/products'); // 403 for forbidden
        }
        next(); // Proceed to the next middleware
    } catch (err) {
        console.error(err);
        req.flash('error', 'Something went wrong');
        return res.status(500).redirect('/products'); // Generic server error
    }
};
const isReviewAuth = async (req, res, next) => {
    const {productID, reviewID} = req.params;
    const currentUser= req.user;
    const foundReview= await Review.findById(reviewID);

    if(!foundReview){
        req.flash('error', 'there is no such review');
        return res.status(403).redirect(`/product/${productID}`);
    }
    if(!foundReview.author.equals(req.user._id)){
        req.flash('error', 'You are not authorized to perform this action');
        return res.status(403).redirect(`/product/${productID}`);
    }
    next();
}


module.exports = {isReviewAuth,validateReview, validateProduct, isLoggedIn, isSeller, isProductAuth};