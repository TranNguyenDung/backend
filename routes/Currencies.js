var express = require('express');
var router = express.Router();
const Currency = require("../models/currency.model");

router.post('/', async(req, res, next)=> {
    const currencies = new Currency({currency:'USA',rate:23000});
    await currencies.save();

    const currencies2 = new Currency({currency:'ASIA',rate:25000});
    await currencies2.save();
    res.send('Create Currency');
});

//
router.get('/find', async(req, res, next)=>{
    //const currencies = await Currency.find();//return query //Cấu trúc làm biếng
    const currencies = await Currency.find().exec();
    console.log(currencies);
    res.send(currencies);
});

router.get('/findOne', async(req, res, next)=>{
    const currencies = await Currency.findOne();
    console.log(currencies);
    res.send(currencies);
});

router.post('/update', async(req, res, next)=>{
    res.send('update');
    await Currency.findOneAndUpdate(
    {_id: new mongoose.Types.ObjectId("6198cca97d6b799e047c6031")},
    {$set: {currency: "OSC",rate: 3453435}}
    );
    res.send('update');
});

router.delete('/', async(req, res, next)=> {
    res.send('delete');
    await Currency.findOneAndDelete({
        _id: new mongoose.Types.ObjectId("6198c805ba1d134c5da71bbb"),
    });

    res.send('delete');
});


// router.get('/:id', (req, res, next)=> {
//     res.send('demo');
// });

// router.put('/:id', (req, res, next)=> {
//     res.send('demo');
// });


// router.put('/product/:id/archived', (req, res, next)=> {
//     res.send('demo');
// });

// router.put('/product/:id/thumbnail', (req, res, next)=> {
//     res.send('demo');
// });

module.exports = router;
