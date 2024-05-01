const mongoose = require("mongoose");
const { Schema } = mongoose;
const stage = new Schema({
  cin: String,
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
  date_creation: Date,
});
const Stage = mongoose.model("Stage", stage);
module.exports = Stage;
