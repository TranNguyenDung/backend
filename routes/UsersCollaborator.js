var express = require('express');
var router = express.router();

router.post('/register', (req, res, next)=> {
  res.send('demo');
});

//
router.post('/admins/profile', (req, res, next)=> {
    res.send('demo');
});


module.exports = router;
