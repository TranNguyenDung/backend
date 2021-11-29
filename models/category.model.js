const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment-timezone");

const CategorySchema = new Schema({
    //name: String,
    name:{
        type: String,
    },
    CreatedAt:{
        type: Number,
        default:() => moment().unix(),
    },
    products:[
        {
            type:Schema.Types.ObjectId,
            ref: 'product',
        }
    ]
});

module.exports = mongoose.model("Category", CategorySchema);