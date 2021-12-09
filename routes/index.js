var express = require("express");
var router = express.Router();
//const {Mongoose} = require('mongoose');
const mongoose = require("mongoose");
const userModel = require("../models/users.model");
const authService = require("../services/auth.service");

// router.all("*", function (req, res, next) {
//   console.log(req.data);
// });

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//Set Port
//await mongoose.connect("mongodb://localhost/erp"); => port default
//await mongoose.connect("mongodb://localhost:3000/erp"); => port do mình set
router.post("/", async (req, res, next) => {
  //mongoose.connect("mongodb://localhost/erp");
  res.send("connect to mongodb");

  await mongoose.connect("mongodb://localhost/erp");
  const PersonSchema = new mongoose.Schema({ name: String, dob: Number }); // Schema
  const Person = mongoose.model("Person", PersonSchema); // Model
  const person = new Person({ name: "Dung", dob: 1988 }); // Document
  await person.save();
  res.send("connect to mongodb");
});

router.put("/", async (req, res, next) => {
  //const mongoose = require("mongoose");
  //await mongoose.connect("mongodb://localhost/erp");
  const PersonSchema = new mongoose.Schema({ name: String, dob: Number }); // Schema
  const Person = mongoose.model("Person", PersonSchema); // Model
  const persons = await Person.find();
  res.send(persons);
  console.log(persons);
});

router.post("/sign-up", async (req, res, next) => {
  console.log("---------sign up");
  const user = await userModel.findOne({ email: req.body.email }).exec();
  if (!!user) {
    res.status(409).send("Email already exist.");
    return;
  }
  const newUser = await userModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  res.status(201).send(newUser);
  //md5
  //blowfish(bcxrypt)
});

router.post("/login", async (req, res, next) => {
  console.log("---------login");
  const user = await userModel.findOne({
    email: req.body.email,
  });
  //console.log(user);

  if (!!!user) {
    res.status(409).send("Invalid user");
  } else if (user.password !== req.body.password) {
    res.status(401).send("Wrong email or password");
  } else if (!user.activeted) {
    res.status(401).send("User is not activeted");
  } else {
    // Send Token
    console.log("authService");
    const token = authService.createJWTToken({
      id: user._id,
      email: user.email,
      // __V: 1 // Version cuar token
    });
    console.log(token);
    res.status(200).send(token);
  }
  //res.send(user);
});

module.exports = router;
