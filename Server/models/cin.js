const mongoose = require("mongoose");
const { Schema } = mongoose;
const cin = new Schema({
  cin: String,
  isRegistred: Boolean,
});
const CIN = mongoose.model("CIN", cin);
module.exports = CIN;
