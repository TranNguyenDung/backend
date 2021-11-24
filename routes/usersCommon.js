var express = require('express');
var router = express.Router();
const userCommonModel = require("../models/usersCommon.model");

//http://localhost:5000/usersCommon/login
//{
//"email": "tnguyendung.x1@gmail.com",
//"password":"123456"
//}
router.post('/login', async(req, res, next)=> {
  const user = await userCommonModel.create({
    email: req.body.email,
    password: req.body.password,
  });
  res.send(user);
});

//http://localhost:5000/usersCommon/login
router.post('/change-password', async(req, res, next)=> {
  const user = await userCommonModel.updateOne({email: req.body.email},{password:req.body.password}).exec();
  res.send(user);
});

router.post('/request-recover-password', (req, res, next)=> {
    res.send('post request-recover-password');
});

router.post('/recover-password', (req, res, next)=> {
    res.send('post recover-password');
});

module.exports = router;
