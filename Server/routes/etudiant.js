const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const Etudiant = require("../models/etudiant");
const CINS = require("../models/cin");
const secretKey = "gozgjzgpojzrpojz";
const Stage = require("../models/stage");

// Multer configuration
const storage = multer.memoryStorage();

// Custom filename function to use the Cin as the filename
const customFilename = (req, file, cb) => {
  cb(null, req.body.etudiant);
};
const upload = multer({ storage: storage, filename: customFilename });

// Register Etudiant
router.post("/register", async (req, res) => {
  try {
    const { nom, prenom, cin, email, password } = req.body;

    // Check if CIN exists
    const exist = await CINS.findOne({ cin });
    if (!exist) {
      return res
        .status(404)
        .send(
          "Vous n'avez pas l'accès à cette plateforme, veuillez contacter l'administrateur."
        );
    }

    // Check if CIN already exists
    const cinExists = await Etudiant.findOne({ cin });
    if (cinExists) {
      return res.status(400).send("CIN déjà existant.");
    }

    // Check if email already exists
    const emailExists = await Etudiant.findOne({ email });
    if (emailExists) {
      return res.status(400).send("Email déjà existant.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Etudiant document
    const etudiant = new Etudiant({
      nom,
      prenom,
      cin,
      email,
      password: hashedPassword,
      room: "A1",
    });
    // Save the new Etudiant document to the database
    await etudiant.save();
    await CINS.findOneAndUpdate({ cin }, { isRegistred: true });
    // Send a success response with the created Etudiant document
    res.status(201).send(etudiant);
  } catch (error) {
    // Handle any errors that occur during registration
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
    console.log(req.body);
    const etudiant = req.body;
    const et = await Etudiant.findOne({ cin: etudiant.etudiant });

    if (!et) {
      return res.status(404).send("Etudiant n'existe pas");
    }
    const binome = await Etudiant.findOne({ cin: etudiant.Binome });
    if (!binome && etudiant.Binome != "") {
      return res.status(404).send("Binome n'existe pas");
    }
    let stage = await Stage.findOne({ etudiant: et._id });
    if (stage) {
      et.fichier = req.file.buffer.toString("base64");
      await Etudiant.findOneAndUpdate({ cin: etudiant.cin }, et);
      await Stage.findOneAndUpdate(
        { etudiant: et._id },
        { binome: binome._id },
        new Stage(etudiant)
      );
      return res.status(200).send("Stage modifié avec succès");
    }
    et.fichier = req.file.buffer.toString("base64");
    const base64EncodedString = et.fichier;

    // Decode base64 string to buffer
    const fileBuffer = Buffer.from(base64EncodedString, "base64");

    // Now you can read the file content from the buffer
    // For example, you can convert it to a string
    const fileContent = fileBuffer.toString("utf-8"); // Assuming the file is encoded in utf-8

    console.log(fileContent);
    await Etudiant.findOneAndUpdate({ cin: etudiant.etudiant }, et);
    stage = new Stage(etudiant);
    if (etudiant.binome) {
      stage.binome = binome._id;
    }
    await stage.save();
    res.status(201).send("Stage ajouté avec succès");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
