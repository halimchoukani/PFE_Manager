const mongoose = require("mongoose");
const { Schema } = mongoose;
const cins = new Schema({
  cin: {
    type: String,
    unique: true,
    validate: {
      validator: function (value) {
        return value.length == 8 && !isNaN(value); // Ensure length is 8 characters
      },
      message: "CIN doit contenir 8 chiffres",
    },
  },
  isRegistred: Boolean,
});
const CIN = mongoose.model("CIN", cins);
module.exports = CIN;
