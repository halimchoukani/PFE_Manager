const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const secretkey = "zgziejgoizghujezighzoihefgzogfhz";
//login
router.post("/login", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (user) {
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      if (!isPasswordCorrect) {
        return res
          .status(400)
          .json({ message: "Email ou mot de passe n'exist pas !! " });
      }
      jwt.sign(
        { email, id: user._id, role: "admin" },
        secretkey,
        {},
        (err, token) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Erreur dans le serveur :( " });
          }
          return res.status(200).cookie("token", token).json({
            id: user._id,
            email: user.email,
            role: "admin",
          });
        }
      );
    } else {
      return res.status(400).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Register
router.post("/register", async (req, res) => {
  const { cin, nom, prenom, email, password } = req.body;
  try {
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email deja exist !!" });
    }
    if (await Admin.findOne({ cin })) {
      return res.status(400).json({ message: "CIN deja exist !!" });
    }
    const newUser = new Admin({
      cin,
      nom,
      prenom,
      email,
      password: await bcrypt.hashSync(password, 10),
    });
    await newUser.save();
    res.status(201).json({ message: "Admin enregistrer avec succes" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/all", async (req, res) => {
  await Admin.find({})
    .then((admins) => {
      res.status(200).send(admins);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/afficher/:id", async (req, res) => {
  let id = req.params.id;
  await Admin.findOne({ _id: id })
    .then((admin) => {
      res.status(200).send(admin);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.delete("/supprimer/:id", async (req, res) => {
  let id = req.params.id;
  await Admin.findByIdAndDelete({ _id: id })
    .then((admin) => {
      res.status(200).send(admin);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
router.put("/modifier/:id", async (req, res) => {
  let id = req.params.id;
  let admin = Admin.findById({ _id: id });
  let data = req.body;
  if (!admin) {
    return res.status(400).send("Admin not found");
  }
  data.password = bcrypt.hashSync(data.password, 10);
  await Admin.findByIdAndUpdate({ _id: id }, data)
    .then((admin) => {
      res.status(200).send(admin);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
