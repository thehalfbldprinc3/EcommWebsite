const mongoose = require('mongoose');
const test = require("node:test");
const reviewSchema= new mongoose.Schema({
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    comment: {
        type: String,
        trim: true,
    }
}, {timestamps: true});
let Review= mongoose.model('Review',reviewSchema);
module.exports = Review;