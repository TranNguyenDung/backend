var express = require('express');
var router = express.router();

router.post('/editors', (req, res, next)=> {
  res.send('demo');
});

//
router.get('/editors', (req, res, next)=> {
    res.send('demo');
});

router.get('/editors/:id', (req, res, next)=> {
    res.send('demo');
});


module.exports = router;
