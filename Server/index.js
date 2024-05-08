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
});
app.use("/admin", adminApi);
app.use("/encadrant", encadrantApi);
app.use("/etudiant", etudiantApi);
app.use("/cin", cinApi);
server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
