const express = require("express");
const router = express.Router();
const cins = require("../models/cin");
router.post("/ajoutercin", async (req, res) => {
  try {
    const { cin } = req.body;
    const exist = await cins.findOne({ cin });
    if (exist) {
      return res.status(400).send("CIN deja existe");
    }
    const newcin = new cins({
      cin,
      isRegistred: false,
    });
    await newcin.save();
    res.status(201).send(newcin);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
