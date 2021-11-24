var express = require('express');
var router = express.Router();
const RoleModel = require("../models/role.model");

//delecteOne
// ok
//http://localhost:5000/role
//body:raw:json
//{
//"name": "SUPERADMIN 2"
//"description": "description"
//}
router.post('/', async (req, res, next)=> {
  const Role = await RoleModel.create({
    name: req.body.name,
    description: req.body.description,
  });
  res.send(Role);
});

//http://localhost:5000/role/619ca70434b44c3daa06fc20/archived
//{
//"archived": true
//}
router.put('/:id/archived', async(req, res, next)=> {
  const Role = await RoleModel.updateOne(
    {
      _id: req.params.id,
    },
    {
      archived:req.body.archived,
    }
    ).exec();
  res.send(Role);
  // res.send('/:id/archived');
});

//
//http://localhost:5000/role/619ca70434b44c3daa06fc20
//body:raw:json
//{
//"name": "SUPERADMIN 2"
//}
router.put('/:id', async(req, res, next)=> {
  //ok
  // const Role = await RoleModel.findOneAndUpdate(
  //   {
  //     _id: req.params.id,
  //     name: "SUPERADMIN 2",
  //   },
  //   {
  //     name: req.body.name,
  //   }
  //   ).exec();
  //res.send(Role);

  //ok
  //thường dùng cái này để có thể lấy được thông tin nhiều hơn
  const updateInfo = await RoleModel.updateOne(
    {
      _id: req.params.id,
      name: "SUPERADMIN 2",
    },
    {
      name: req.body.name,
    }
  );
  res.send(updateInfo);
  
  // res.send('/:id/archived');
});

// ok
//http://localhost:5000/role
router.get('/', async(req, res, next)=> {
  const Roles = await RoleModel.find().exec();
  res.send(Roles);
});

// ok
//http://localhost:5000/role/619ca70434b44c3daa06fc20
router.get('/:id',async (req, res, next)=> {
  //const Role = await RoleModel.findById(req.params.id).exec();
  //const Role = await RoleModel.findOne({_id:req.params.id}).exec();
  const Role = await RoleModel.find({_id:req.params.id}).exec();
  res.send(Role);
});


module.exports = router;
