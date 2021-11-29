var express = require("express");
var router = express.Router();

const categoryModel = require("../models/category.model");
const authService = require("../services/auth.service");

//all methot
router.all("*",async(req,res,next)=>{
    authService.verifyJWT_MW(req,res,next);
})
// /http://localhost:5000/categories
// {
//     "category": "Trái Đất"
// }
router.post("/", async (req, res, next) => {
    const category = await categoryModel.create({
        name: req.body.category,
    });
    res.send(category);
});


router.get("/", async (req, res, next) => {
    console.log(req.user);
    const category = await categoryModel.find({ });
    res.send(category);
});

router.get("/", async (req, res, next) => {
    const category = await categoryModel.find({ }).populate('products').exec();
    res.send(category);
});

module.exports = router;
