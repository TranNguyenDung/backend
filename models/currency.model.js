const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CurrencySchema = new Schema({
    currency: String,
    rate: Number,
});

module.exports = mongoose.model("Currency", CurrencySchema);