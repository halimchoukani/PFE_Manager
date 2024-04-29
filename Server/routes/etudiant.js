const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const Etudiant = require("../models/etudiant");

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
      return res.status(404).send("Etudiant not found");
    }
    const isPasswordMatch = await bcrypt.compare(password, etudiant.password);
    if (!isPasswordMatch) {
      return res.status(401).send("Invalid password");
    }
    const token = jwt.sign({ id: etudiant._id }, "your_secret_key", {
      expiresIn: "1h",
    });
    res.send({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Create Stage PFE
router.post("/stage", upload.single("fichier"), async (req, res) => {
  try {
    const { sujet, description, date_debut, date_fin } = req.body;
    const etudiantId = req.user.id; // Extracted from JWT token
    const etudiant = await Etudiant.findById(etudiantId);
    if (!etudiant) {
      return res.status(404).send("Etudiant not found");
    }
    const stage = {
      sujet,
      description,
      date_debut,
      date_fin,
      fichier: req.file.buffer, // Store file buffer
    };
    etudiant.stage_pfe = stage;
    await etudiant.save();
    res.status(201).send(etudiant.stage_pfe);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
