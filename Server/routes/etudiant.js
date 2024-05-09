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
    const e = new Etudiant(req.body);

    // Check if CIN exists
    const exist = await CINS.findOne({ cin: e.cin });
    if (!exist) {
      return res
        .status(404)
        .send(
          "Vous n'avez pas l'accès à cette plateforme, veuillez contacter l'administrateur."
        );
    }

    // Check if CIN already exists
    const cinExists = await Etudiant.findOne({ cin: e.cin });
    if (cinExists) {
      return res.status(400).send("CIN déjà existant.");
    }

    // Check if email already exists
    const emailExists = await Etudiant.findOne({ email: e.email });
    if (emailExists) {
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
// Create Stage PFE
router.post("/ajouterstage", upload.single("fichier"), async (req, res) => {
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
    if (stage) {
      et.fichier = req.file.buffer.toString("base64");
      await Etudiant.findOneAndUpdate({ cin: etudiant.etudiant }, et);
      await Stage.findOneAndUpdate(
        { etudiant: et.cin },
        { binome: binome ? binome.cin : "" },
        new Stage(etudiant)
      );
      return res.status(200).send("Stage modifié avec succès");
    }
    et.fichier = req.file.buffer.toString("base64");
    console.log(et);
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
