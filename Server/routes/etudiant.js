const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const Etudiant = require("../models/etudiant");
const CIN = require("../models/cin");
const secretKey = "gozgjzgpojzrpojz";
const Stage = require("../models/stage");
// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Fichier must be a PDF"));
    }
  },
  filename: (req, file, cb) => {
    const fileName = req.body.cin + ".pdf"; // Rename file to student's cin
    cb(null, fileName);
  },
});

// Register Etudiant
router.post("/register", async (req, res) => {
  try {
    const { nom, prenom, cin, email, password, room } = req.body;
    const exist = CIN.findOne({ cin: cin });
    if (exist) {
      const existingEtudiant = await Etudiant.findOne({ email });
      if (existingEtudiant) {
        return res.status(400).send("email deja existe");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const etudiant = new Etudiant({
        nom,
        prenom,
        cin,
        email,
        password: hashedPassword,
        room,
      });
      await etudiant.save();
      res.status(201).send(etudiant);
    } else {
      res
        .status(404)
        .send("Vous n'avez pas l'access a cette platform , contacter l'admin");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Login Etudiant
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const etudiant = await Etudiant.findOne({ email });
    if (!etudiant) {
      return res.status(404).send("Etudiant n'existe pas");
    }
    const isPasswordMatch = await bcrypt.compare(password, etudiant.password);
    if (!isPasswordMatch) {
      return res.status(401).send("Email out mot de passe incorrecte");
    }
    const token = jwt.sign({ id: etudiant._id }, secretKey, {
      expiresIn: "24h",
    });
    res.send({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create Stage PFE
router.post("/ajouterstage", upload.single("fichier"), async (req, res) => {
  try {
    const etudiant = req.body;
    const et = await Etudiant.findOne({ cin: etudiant.cin });
    const binome = await Etudiant.findOne({ cin: etudiant.binome });
    if (!et) {
      return res.status(404).send("Etudiant n'existe pas");
    }
    if (!binome) {
      return res.status(404).send("Binome n'existe pas");
    }
    const stage = Stage.findOne({ etudiant: et._id });
    const s = new Stage();
    if (stage) {
      stage.findOneAndUpdate(
        { etudiant: et._id },
        { binome: binome._id },
        etudiant
      );
      return res.status(200).send("Stage modifié avec succès");
    }
    stage.save();
    res.status(201).send("Stage ajouté avec succès");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
