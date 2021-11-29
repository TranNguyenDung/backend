var express = require('express');
var router = express.Router();
//const {Mongoose} = require('mongoose');
const mongoose = require("mongoose");
const userCommonModel = require("../models/usersCommon.model");
const authService = require("../services/auth.service");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Set Port
//await mongoose.connect("mongodb://localhost/erp"); => port default
//await mongoose.connect("mongodb://localhost:3000/erp"); => port do mình set
router.post("/",async (req,res,next) =>{
  //mongoose.connect("mongodb://localhost/erp");
  res.send("connect to mongodb");

  await mongoose.connect("mongodb://localhost/erp");
  const PersonSchema = new mongoose.Schema({ name: String, dob: Number });	// Schema
  const Person = mongoose.model("Person", PersonSchema);		// Model
  const person = new Person({ name: "Dung", dob: 1988 });			// Document
  await person.save();
  res.send("connect to mongodb");
});

router.put("/",async (req,res,next)=>{
  //const mongoose = require("mongoose");
  //await mongoose.connect("mongodb://localhost/erp");
  const PersonSchema = new mongoose.Schema({ name: String, dob: Number });	// Schema
  const Person = mongoose.model("Person", PersonSchema);		// Model
  const persons = await Person.find();
  res.send(persons);
  console.log(persons);
})


router.post('/login', async(req, res, next)=> {
  //res.send('/login');
  const user = await userCommonModel.findOne({
    email: req.body.email,
  });

  if(!!!user){
    res.status(401).send("Invalid user");
  }
  else if(user.password !== req.body.password){
    res.status(401).send("Wrong email or password");
  }
  else if(!user.activeted){
    res.status(401).send("User is not activeted");
  }
  else{
    // Send Token
    const token = authService.createJWTToken({email: user.email});
    res.status(401).send(token);
  }
  //res.send(user);
});

module.exports = router;
