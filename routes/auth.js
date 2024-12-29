const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');


//Get form to register
router.get('/register', (req, res) => {
    res.render('auth/signup');
})
//Actually put user in DB
router.post('/register', async (req, res) => {
    let {username,email,password,role}=req.body;
    const user=new User({email,username,role});
    const newUser=await User.register(user,password);
    req.login(newUser,(err)=>{
        if(err){return next(err)}
        req.flash('success','User registered and logged in successfully.');
        return res.redirect('/products');
    });
})

//Get the Login form
router.get('/login',(req,res)=>{
    res.render('auth/login');
});
//Actually login using DB
router.post('/login',passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true,
    }),
(req,res)=>{
    // console.log(req.user);
    req.flash('success','Welcome Back');
    res.redirect('/products');
})
//logout
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Logged Out');
        res.redirect('/products');
    });
});

module.exports = router;