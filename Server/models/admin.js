const mongoose = require("mongoose");
const { Schema } = mongoose;
const adminSchema = new Schema({
  nom: String,
  prenom: String,
  email: String,
  password: String,
});
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
