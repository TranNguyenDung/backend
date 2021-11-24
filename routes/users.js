var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//
router.delete('/path2', function(req, res, next) {
  //res.send('đã nhận được delect mothot');
  res.send(JSON.stringify({name:"tên của bạn là"}));
  //res.status(401).json(JSON.stringify({name:"truyền dạng json"}));
});

router.post('/path2', function(req, res, next) {
  res.send('đã nhận được post mothot');
});


module.exports = router;
