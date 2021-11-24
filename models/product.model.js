const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    price: Number,
    description: {type: String, default: ""}
});

module.exports = mongoose.model("Product", ProductSchema);