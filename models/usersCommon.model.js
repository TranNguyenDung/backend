const mongoose = require("mongoose");
const MongooseDocumentArray = require("mongoose/lib/types/DocumentArray");
const Schema = mongoose.Schema;
const moment = require("moment-timezone");
const UserCommonSchema = new Schema({
    email:{
        type: String,
    },
    password:{
        type: String,
    },
    activeted:{
        type: Boolean,
        default: true,
    }
});

module.exports = mongoose.model("userCommon", UserCommonSchema);