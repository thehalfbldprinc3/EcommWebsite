const Joi= require('joi');

const productSchema = Joi.object({
    name: Joi.string().required(),
    descr: Joi.string().required(),
    price: Joi.number().required().positive(),
    imgLink: Joi.string().required(),
});

const reviewSchema= Joi.object({
    rating : Joi.number().min(0).max(5).required(),
    comment : Joi.string().required(),
});

module.exports = {productSchema,reviewSchema};


