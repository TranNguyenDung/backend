var express = require('express');
var router = express.router();

router.post('/product-categories', (req, res, next)=> {
  res.send('demo');
});

//
router.get('/product-categories', (req, res, next)=> {
    res.send('demo');
});

router.get('/product-categories/:id', (req, res, next)=> {
    res.send('demo');
});

router.put('/product-categories/:id', (req, res, next)=> {
    res.send('demo');
});

router.put('/product-categories/:id/archived', (req, res, next)=> {
    res.send('demo');
});

module.exports = router;
