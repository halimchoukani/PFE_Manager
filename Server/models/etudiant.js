const mongoose = require("mongoose");
const { Schema } = mongoose;
const etudiantSchema = new Schema({
  nom: String,
  prenom: String,
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
