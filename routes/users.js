var express = require('express');
const { verifyJWT_MW } = require('../services/auth.service');
var router = express.Router();
const userModel = require("../models/users.model");
const roleModel = require("../models/role.model");

router.get("/",verifyJWT_MW);


router.get('/', async(req, res, next)=> {
  const users = await UserCommonSchema.find();
  res.status(200).send(users);
});


router.put("/:id",async(req,res,next)=>{
  const user = await userModel.findById(req.params.id);//.lean() tra ve obj
  user.name = req.body.name;
  await user.save();
});


router.delete('/path2', function(req, res, next) {
  res.send(JSON.stringify({name:"tên của bạn là"}));
  //res.status(401).json(JSON.stringify({name:"truyền dạng json"}));
});

router.post('/path2', function(req, res, next) {
  res.send('đã nhận được post mothot');
});


module.exports = router;
