if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const PORT= process.env.PORT || 8080;
const express = require('express');
const app = express();
const path = require('path');

const mongoose = require('mongoose');
const seedDB= require('./seed');

const ejsMate= require('ejs-mate');
const methodOverride = require('method-override');

const flash= require('connect-flash');
const session = require('express-session');

const passport = require('passport');
const LocalStrategy= require('passport-local');
const User= require('./models/User');

const productRoutes = require('./routes/product.js');
const reviewRoutes = require('./routes/review.js');
const authRoutes = require('./routes/auth.js');
const cartRoutes = require('./routes/cart.js');

const {config} = require("nodemon");
const productAPI= require('./routes/api/productapi.js');

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
      console.log('MongoDB Connected!');
    }).catch(
        (err) => {console.log("DB could not be connected",err);
    });

let configSession= {
    secret: process.env.SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production', // Secure cookies only in production
        httpOnly: true, // Recommended for security
        expires: Date.now() + 24 * 7 * 60 * 60 * 1000,
        maxAge: 24 * 7 * 60 * 60 * 1000,
    },
};

app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use(flash());
app.use(session(configSession));


app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next();
});
app.use(productAPI);

app.use(productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);
app.use(cartRoutes);

app.get('/',(req,res)=>{
    res.render('home');
});


passport.use(new LocalStrategy(User.authenticate()));

// seeding database
// seedDB();

app.listen(PORT, () => {
    console.log(`Server Connected at port: ${PORT}`);
});