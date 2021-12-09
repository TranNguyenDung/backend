const mongoose = require("mongoose");
const MongooseDocumentArray = require("mongoose/lib/types/DocumentArray");
const Schema = mongoose.Schema;
const moment = require("moment-timezone");
const UserSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  activeted: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("user", UserSchema);
