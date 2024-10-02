const mongoose = require("mongoose");
const { Schema } = mongoose;
const adminSchema = new Schema({
  cin: {
    type: String,
    required: true,
    unique: true,
  },
  nom: String,
  prenom: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
});
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
