var express = require('express');
var router = express.router();

router.post('/superadmin/root', (req, res, next)=> {
  res.send('/superadmin/root');
});

//
router.post('/superadmin', (req, res, next)=> {
  res.send('/superadmin');
});

router.get('/superadmin', (req, res, next)=> {
    res.send('/superadmin');
});

router.get('/superadmin/:id', (req, res, next)=> {
    res.send('/superadmin/:id');
});

module.exports = router;
