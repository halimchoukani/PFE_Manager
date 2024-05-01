const mongoose = require("mongoose");
const { Schema } = mongoose;
const etudiantSchema = new Schema({
  nom: String,
  prenom: String,
  cin: String,
  email: String,
  password: String,
  fichier: String,
  status: {
    type: String,
    enum: ["Activé", "Disactivé"],
    default: "Activé",
  },
  room: String,
});
const Etudiant = mongoose.model("Etudiant", etudiantSchema);
module.exports = Etudiant;
