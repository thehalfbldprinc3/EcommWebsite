const mongoose = require('mongoose');
const Product= require('./models/Product');

const products= [
    {
        name:'iPhone 16',
        imgLink:'https://plus.unsplash.com/premium_photo-1681396658834-b56190480934?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGlwaG9uZXxlbnwwfHwwfHx8MA%3D%3D',
        price:150000,
        descr:'This is a stupid iPhone 16 enjoy',
    },{
        name:'MacBook Air M2',
        imgLink:'https://plus.unsplash.com/premium_photo-1681147271469-662babeb9d39?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D',
        price:87999,
        descr:'This is a stupid Macbook Air M2',
    },{
        name:'Air Pods Pro 2',
        imgLink:'https://images.unsplash.com/photo-1675317132583-75301c0d0287?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price:27000,
        descr:'This is the stupid Air Pods Pro 2',
    },{
        name:'Apple Watch 2',
        imgLink:'https://images.unsplash.com/photo-1579811216948-6f57c19376a5?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price:65000,
        descr:'This is the stupid Apple Watch 2',
    },{
        name:'Air Tag',
        imgLink:'https://images.unsplash.com/photo-1579811216948-6f57c19376a5?q=80&w=1992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price:3500,
        descr:'This is the stupid Air Tag',
    },
];

async function seedDB(){
    await Product.insertMany(products);
    console.log('Data Seeded Successfully');
}

module.exports= seedDB;