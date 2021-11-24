var express = require('express');
var router = express.router();

router.post('/admins/root', (req, res, next)=> {
  res.send('demo');
});

//
router.post('/admins', (req, res, next)=> {
    res.send('demo');
});
  

router.get('/admins', (req, res, next)=> {
    res.send('demo');
});
  

router.get('/admins/:id', (req, res, next)=> {
    res.send('demo');
});


module.exports = router;
