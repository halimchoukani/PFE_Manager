const mongoose = require("mongoose");
const { Schema } = mongoose;
const encadrantSchema = new Schema({
  nom: String,
  prenom: String,
  cin: { type: String, unique: true, length: 8 },
  email: { type: String, unique: true },
  password: String,
  status: {
    type: String,
    enum: ["Activé", "Disactivé"],
    default: "Activé",
  },
  room: [],
});
const Encadrant = mongoose.model("Encadrant", encadrantSchema);
module.exports = Encadrant;
