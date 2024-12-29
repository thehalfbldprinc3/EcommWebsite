const mongoose = require('mongoose');
const Review = require("./Review");
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        // required: true,
        trim: true
    },
    imgLink: {
        type: String,
        // required: true,
        // default
    },
    price: {
        type: Number,
        // required: true,
        min: 0,
    },
    descr: {
        type: String,
        trim: true,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        }
    ],
    author:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
});

productSchema.post('findOneAndDelete',async (product)=>{
    if(product.reviews.length>0){
        await Review.deleteMany({_id:{$in:product.reviews}})
    }
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
module.exports = Product;