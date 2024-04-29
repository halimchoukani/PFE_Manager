const mongoose = require("mongoose");
const { Schema } = mongoose;
const encadrantSchema = new Schema({
  nom: String,
  prenom: String,
  cin: String,
  email: String,
  password: String,
  room: String,
});
const Encadrant = mongoose.model("Encadrant", encadrantSchema);
module.exports = Encadrant;
