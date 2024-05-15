// Import required modules
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const multer = require("multer");
const salt = bcrypt.genSaltSync(10);
const cinApi = require("./routes/cin");
const adminApi = require("./routes/admin");
const encadrantApi = require("./routes/encadrant");
const etudiantApi = require("./routes/etudiant");
const Stage = require("./models/stage");
// Set up CORS
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Set up MongoDB connection
mongoose.connect(
  "mongodb+srv://isetrades:pi2024@pfemanger.rfwett7.mongodb.net/?retryWrites=true&w=majority&appName=pfeManger"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Import schema and model files
const Admin = require("./models/admin");
const Encadrant = require("./models/encadrant");
const Etudiant = require("./models/etudiant");
const exp = require("constants");
const CIN = require("./models/cin");

// Set up Multer for file uploads

// Set up Socket.IO server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
  socket.on("getStudents", async (callback) => {
    const students = await Etudiant.find({});
    callback(students);
  });
  socket.on("getTeachers", async (callback) => {
    const teachers = await Encadrant.find({});
    callback(teachers);
  });
  socket.on("getStages", async (callback) => {
    const stages = await Stage.find({});
    const stageswithfiles = [];
    for (let i = 0; i < stages.length; i++) {
      const et = await Etudiant.findOne({ cin: stages[i].etudiant });
      const file = et.fichier;
      stageswithfiles.push({
        _id: stages[i]._id,
        stage: stages[i]._id,
        etudiantCin: et.cin,
        etudiantNom: et.nom,
        etudiantClasse: et.classe,
        etudiantPrenom: et.prenom,
        etudiantEmail: et.email,
        status: stages[i].status,
        etudiantBinome: et.Binome,
        binomeClasse: "Classe Binome",
        encadrant: stages[i].encadrant,
        entreprise: stages[i].nom_entreprise,
        contact: stages[i].contact_entreprise,
        encadrant_societe: stages[i].encadrant_entreprise,
        sujet: stages[i].sujet_stage,
        date_creation: stages[i].date_creation,
      });
    }
    callback(stageswithfiles);
  });
  socket.on("getStagesVerifie", async (callback) => {
    const stages = await Stage.find({ status: "Vérifée" });
    const stageswithfiles = [];
    for (let i = 0; i < stages.length; i++) {
      const et = await Etudiant.findOne({ cin: stages[i].etudiant });
      const file = et.fichier;
      stageswithfiles.push({
        _id: stages[i]._id,
        stage: stages[i]._id,
        etudiantCin: et.cin,
        etudiantNom: et.nom,
        etudiantClasse: et.classe,
        etudiantPrenom: et.prenom,
        etudiantEmail: et.email,
        status: stages[i].status,
        etudiantBinome: et.Binome,
        binomeClasse: "Classe Binome",
        encadrant: stages[i].encadrant,
        entreprise: stages[i].nom_entreprise,
        contact: stages[i].contact_entreprise,
        encadrant_societe: stages[i].encadrant_entreprise,
        sujet: stages[i].sujet_stage,
        date_creation: stages[i].date_creation,
      });
    }
    callback(stageswithfiles);
  });
  socket.on("getStagesEnCours", async (callback) => {
    const stages = await Stage.find({ status: "En cours" });
    const stageswithfiles = [];
    for (let i = 0; i < stages.length; i++) {
      const et = await Etudiant.findOne({ cin: stages[i].etudiant });
      const file = et.fichier;
      stageswithfiles.push({
        _id: stages[i]._id,
        stage: stages[i]._id,
        etudiantCin: et.cin,
        etudiantNom: et.nom,
        etudiantClasse: et.classe,
        etudiantPrenom: et.prenom,
        etudiantEmail: et.email,
        status: stages[i].status,
        etudiantBinome: et.Binome,
        binomeClasse: "Classe Binome",
        encadrant: stages[i].encadrant,
        entreprise: stages[i].nom_entreprise,
        contact: stages[i].contact_entreprise,
        encadrant_societe: stages[i].encadrant_entreprise,
        sujet: stages[i].sujet_stage,
        date_creation: stages[i].date_creation,
      });
    }
    callback(stageswithfiles);
  });
  socket.on("getVerifiedNumber", async (callback) => {
    const stages_verified = await Stage.find({ status: "Vérifée" });
    const stages = await Stage.find({});
    callback(
      parseFloat((stages_verified.length * 100) / stages.length).toFixed(2)
    );
  });
  socket.on("getStageSubmitItByStudents", async (callback) => {
    const allStudents = await CIN.find({});
    const stages = await Stage.find({});
    callback(parseFloat((stages.length * 100) / allStudents.length).toFixed(2));
  });

  socket.on("getTeachersStage", async (data, callback) => {
    const stages = await Stage.find({ encadrant: data });
    const stageswithfiles = [];
    for (let i = 0; i < stages.length; i++) {
      const et = await Etudiant.findOne({ cin: stages[i].etudiant });
      const file = et.fichier;
      stageswithfiles.push({
        _id: stages[i]._id,
        etudiantCin: et.cin,
        status: stages[i].status,
        etudiantNom: et.nom,
        etudiantPrenom: et.prenom,
        etudiantEmail: et.email,
        etudiantBinome: et.Binome,
        etudiantFichier: file,
        entreprise: stages[i].nom_entreprise,
        sujet: stages[i].sujet,
        date_creation: stages[i].date_creation,
      });
    }
    callback(stageswithfiles);
  });

  socket.on("addcin", async (data, callback) => {
    const cin = new CIN({
      cin: data,
      isRegistred: false,
    });
    try {
      await cin.save();
      callback("CIN est ajouté avec succès");
    } catch (error) {
      callback("CIN existe déjà");
    }
  });
});
app.use("/admin", adminApi);
app.use("/encadrant", encadrantApi);
app.use("/etudiant", etudiantApi);
app.use("/cin", cinApi);
server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
