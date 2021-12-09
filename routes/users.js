var express = require("express");
const { verifyJWT_MW } = require("../services/auth.service");
var router = express.Router();
const userModel = require("../models/users.model");
const roleModel = require("../models/role.model");

// router.all("*", async (req, res, next) => {
//   console.log("----------------ALL");
//   console.log(req);
// });
router.get("/", verifyJWT_MW);
router.put("/:id", verifyJWT_MW);

router.get("/", async (req, res, next) => {
  console.log(">>>get methot start");
  console.log(req.params.id);
  //const user = await userModel.findById(req.params.id);
  const user = await userModel.find().exec();
  console.log(user);
  res.status(200).send(user);
});

router.put("/:id", async (req, res, next) => {
  console.log("----------------put/id");
  const user = await userModel.findById(req.params.id);
  user.name = req.body.name;
  await user.save();
  res.status(200).send(user);
});

router.get("/:id", async (req, res, next) => {
  console.log("----------------get/:id");
  const user = await userModel.findById(req.params.id); //.lean() tra ve obj
  res.status(200).send(user);
});

router.put("/:id", async (req, res, next) => {
  console.log("----------------put/:id");
  const user = await userModel.findById(req.params.id); //.lean() tra ve obj
  user.name = req.body.name;
  await user.save();
});

router.delete("/path2", function (req, res, next) {
  res.send(JSON.stringify({ name: "tên của bạn là" }));
  //res.status(401).json(JSON.stringify({name:"truyền dạng json"}));
});

router.post("/path2", function (req, res, next) {
  res.send("đã nhận được post mothot");
});

module.exports = router;
