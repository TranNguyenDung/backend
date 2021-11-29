const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment-timezone");

const Currency2Schema = new Schema({
    code:{
        type: String,
    },
    currency:{
        type: String,
    },
    icon:{
        type: String,
    },
    rate:{
        type: Number
    }
});

module.exports = mongoose.model("Currency2", Currency2Schema);