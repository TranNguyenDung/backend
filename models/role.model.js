const mongoose = require("mongoose");
const MongooseDocumentArray = require("mongoose/lib/types/DocumentArray");
const Schema = mongoose.Schema;
const moment = require("moment-timezone");
const RoleSchema = new Schema({
    //name: String,
    //description: String,
    //createdAt: Date,
    //archived: Boolean,

    name:{
        type: String,
    },
    description:{
        type: String,
    },
    createdAt:{
        type: Number,
        default: () => moment().unix(),
    },
    archived:{
        type: Boolean,
        default: false,
    },

    
});

module.exports = mongoose.model("Role", RoleSchema);