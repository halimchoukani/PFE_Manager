const mongoose = require("mongoose");
const { Schema } = mongoose;
const stage = new Schema({
  etudiant: String,
  classe: String,
  Binome: String,
  classe_binome: String,
  status: {
    type: String,
    enum: ["Vérifée", "En cours", "Non Accepter"],
    default: "En cours",
  },
  contact_enreprise: String,
  nom_entreprise: String,
  sujet_stage: String,
  date_creation: {
    type: Date,
    default: Date.now,
  },
});
const Stage = mongoose.model("Stage", stage);
module.exports = Stage;
