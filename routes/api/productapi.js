const express = require('express');
const {isLoggedIn} = require('../../middleware');
const User= require('../../models/User');
const router = express.Router();

router.post('/products/:productID/like', isLoggedIn, async (req, res) => {
    const { productID } = req.params;
    let user= req.user;
    console.log('API Route Hit');
    let isLiked= user.wishlist.includes(productID);
    if(isLiked){
        await User.findByIdAndUpdate(req.user._id , {$pull: {wishlist : productID} })
    }else{
        await User.findByIdAndUpdate(req.user._id , {$addToSet: {wishlist : productID}})
    }
    res.status(201).send('ok');
})
module.exports = router;
