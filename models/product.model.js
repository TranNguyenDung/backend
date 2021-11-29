const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment-timezone");

const ProductSchema = new Schema({
    name: String,
    price: Number,
    description: {type: String, default: ""},
    CreatedAt:{
        type: Number,
        default:() => moment().unix(),
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category',
    }
});

module.exports = mongoose.model("Product", ProductSchema);