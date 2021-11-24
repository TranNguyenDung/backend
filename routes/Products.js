var express = require('express');
var router = express.Router();
const Person = require("../models/product.model");

router.post('/', async(req, res, next)=> {
    res.send('await Product.find();');
    const products = await Product.find(

    ).exec();

    console.log(products);
    res.send('demo');
});

//
router.get('/products', (req, res, next)=>{
    res.send('demo');
});

router.get('/product/:id', (req, res, next)=> {
    res.send('demo');
});

router.put('/product/:id', (req, res, next)=> {
    res.send('demo');
});


router.put('/product/:id/archived', (req, res, next)=> {
    res.send('demo');
});

router.put('/product/:id/thumbnail', (req, res, next)=> {
    res.send('demo');
});

module.exports = router;
