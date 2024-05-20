const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Etudiant = require("../models/etudiant");
const CINS = require("../models/cin");
const secretKey = "gozgjzgpojzrpojz";
const Stage = require("../models/stage");

const multer = require("multer");
const path = require("path");

// Register Etudiant
router.post("/register", async (req, res) => {
  try {
    const e = new Etudiant(req.body);
    console.log(e);
    // Check if CIN exists
    const exist = await CINS.findOne({ cin: e.cin });
    if (!exist) {
      console.log("CIN not found");
      return res
        .status(404)
        .send(
          "Vous n'avez pas l'accès à cette plateforme, veuillez contacter l'administrateur."
        );
    }

    // Check if CIN already exists
    const cinExists = await Etudiant.findOne({ cin: e.cin });
    if (cinExists) {
      console.log("CIN already exists");
      return res.status(400).send("Etudiant déjà existant.");
    }

    // Check if email already exists
    const emailExists = await Etudiant.findOne({ email: e.email });
    if (emailExists) {
      console.log("email already exists");

      return res.status(400).send("Email déjà existant.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(e.password, 10);
    // Save the new Etudiant document to the database
    e.password = hashedPassword;
    await e.save();
    await CINS.findOneAndUpdate({ cin: e.cin }, { isRegistred: true });
    // Send a success response with the created Etudiant document
    res.status(201).send(e);
  } catch (error) {
    // Handle any errors that occur during registration
    res.status(500).send("fhzifuhzfioh");
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
    res.send({
      token,
      cin: etudiant.cin,
      nom: etudiant.nom,
      prenom: etudiant.prenom,
      email: etudiant.email,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.get("/getfile/:cin", async (req, res) => {
  try {
    const cin = req.params.cin;
    const etudiant = await Etudiant.findOne({ cin: cin });
    if (!etudiant) {
      return res.status(404).send("Etudiant not found");
    }
    // Ensure that etudiant.fichier is not null before sending
    if (!etudiant.fichier) {
      return res.status(404).send("File not found for this student");
    }
    const fileBuffer = Buffer.from(etudiant.fichier, "base64");
    res.setHeader("Content-Type", "application/pdf");
    res.send(fileBuffer);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "");
  },
  filename: (req, file, cb) => {
    // const uniqueSuffix = "Date.now() + " - " + Math.round(Math.random() * 1e9)";
    cb(null, req.body.etudiant + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
router.post("/ajouterstage", upload.single("fichier"), async (req, res) => {
  console.log(req.body);
  try {
    const etudiant = req.body;
    const et = await Etudiant.findOne({ cin: etudiant.etudiant });

    if (!et) {
      return res.status(404).send("Etudiant n'existe pas");
    }
    const binome = await Etudiant.findOne({ cin: etudiant.Binome });
    if (!binome && etudiant.Binome != "") {
      return res.status(404).send("Binome n'existe pas");
    }

    let stage = await Stage.findOne({ etudiant: et.cin });
    const filePath = req.file ? req.file.path : "";
    if (binome) {
      let stagebinome = new Stage();
      stagebinome.etudiant = binome.cin;
      stagebinome.email = binome.email;
      stagebinome.Binome = et.cin;
      stagebinome.email_binome = et.email;
      stagebinome.classe_binome = binome.classe;
      stagebinome.classe = binome.classe;
      stagebinome.nom_entreprise = etudiant.nom_entreprise;
      stagebinome.sujet_stage = etudiant.sujet_stage;
      stagebinome.date_creation = Date.now();
      stagebinome.encadrant = etudiant.encadrant;
      stagebinome.encadrant_entreprise = etudiant.encadrant_entreprise;
      await stagebinome.save();
    }
    if (stage) {
      if (filePath != "") {
        et.fichier = filePath;
      }
      await Etudiant.findOneAndUpdate({ cin: etudiant.etudiant }, et);
      await Stage.findOneAndUpdate(
        { etudiant: et.cin },
        { binome: binome ? binome.cin : "", ...etudiant }
      );
      return res.status(200).send("Stage modifié avec succès");
    }

    if (filePath != "") {
      et.fichier = filePath;
      await Etudiant.findOneAndUpdate({ cin: etudiant.etudiant }, et);
    }

    stage = new Stage({ ...etudiant, fichier: filePath });
    if (etudiant.binome) {
      stage.binome = binome._id;
    }
    await stage.save();
    res.status(201).send("Stage ajouté avec succès");
  } catch (error) {
    res.status(500).send(error.message);
  }
});
router.get("/getfile/:cin", async (req, res) => {
  try {
    const cin = req.params.cin;
    const etudiant = await Etudiant.findOne({ cin: cin });
    if (!etudiant) {
      return res.status(404).send("Etudiant not found");
    }
    // Ensure that etudiant.fichier is not null before sending
    if (!etudiant.fichier) {
      return res.status(404).send("File not found for this student");
    }
    res.sendFile(path.resolve(etudiant.fichier));
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
