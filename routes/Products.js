var express = require('express');
var router = express.Router();
const ProductModel = require("../models/product.model");
const { Types } = require("mongoose");

const {get} = require('lodash');
const multer = require("multer");
const { fromString } = require('mongoose/lib/drivers/node-mongodb-native/decimal128');
const upload = multer({dest: 'uploads/'});
const fs = require("fs");
const fsPromises = fs.promises;

router.post("/upload-thumbnail", upload.single("image"), async (req, res, next) => {
    const uploadFolder = "uploads2";
    if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);
    console.log(req.file);
    await fsPromises.copyFile(req.file.path, `${uploadFolder}\\${path.basename(req.file.path)}`);
    await fsPromises.unlink(req.file.path);

    if (!req.file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    res.send(req.file);
  }
);



// Export default thì không cần ngoặc nhọn: get:
// Export thường thí phải có ngoặc nhọn: {get} 

router.post('/', async(req, res, next)=> {
    //const products = await ProductModel.find().exec();
    
    const products = await ProductModel.create({
        name: req.body.name,
        price: req.body.price,
        category: Types.ObjectId(req.body.category), 
    });
    console.log(products);
    res.send('await Product.find();');
});

router.get('/category', async(req, res, next)=>{
    // res.send("category get content");
    //const products = await ProductModel.find({}).populate("category").exec();//category thêm trường category vào danh sách trả về
    //const products = await ProductModel.find({}).populate('category',{name: 1}).exec();//Lấy trường  name
    const products = await ProductModel.find({}).populate('category',{price: 1}).exec();//Lấy trường  name
    //const products = await ProductModel.find({}).populate("category",{name:1,createdAt:1}).exec();//Lấy trường  name & createdAt
    res.send(products);

});

// Get product with if
router.get('/', async(req, res, next)=>{
    // res.send("products");
    const page = 0;//req.query.page;
    const pageSize = 10;//req.query.pageSize;
    const total = await ProductModel.count({});
    const pages = ceil(total/pageSize);
    const skip = page * pageSize;
    const loadPrice = 1;//req.query.loadPrice;
    const fields = loadPrice ? ['price','name'] : ['name'];
    //const product = await ProductModel.find({},['price','name']);
    //const products = await ProductModel.find({},['price','name'],{skip, limit:pageSize}).exec();
    //const products = await ProductModel.find({},['price','name'],{skip, limit:pageSize,soft:{createAt:"desc"}}).exec();
    //const products = await ProductModel.find({},fields,{skip, limit:pageSize,soft:{createAt:"desc"}}).exec();
    res.send(" inti get products");

    const query = ProductModel.find({});
    //if(!!!loadPrice && loadPrice === true){// 
    if (get(req, 'query.loadPrice',false)){
        query.select({price:1});//o là loại trừ, số 1 là nhận
    }
    else{
        query.select({price:1, name:1});
    }
    //query.select({name:1});
    //if (get(req, 'query.loadPrice',false)){
    //    query.select({price:1});
    
    //-> không phân trang
    //if(get(req,'query.all',false)===false){
        //query.skip(xxx);
        //query.limit(yyy);
    //}

    const products = await query.exec();

    // res.send({
    //     pagination: {page,pageSize,total,pages},
    //     products});

    res.send(products);
});

// get all products
router.get('/products', async(req, res, next)=>{
    const products = await ProductModel.find({});
    res.send(products);
});

// Demo delete ok
router.delete('/:id',async(req,res,next)=>{
    // find
    const products = await ProductModel.findOneAndRemove({_id:req.params.id},function (err, docs) {
        if (err){res.send("remove ng");}
        else{res.send("remove ok");}
    });
    res.send(products);
});

module.exports = router;
