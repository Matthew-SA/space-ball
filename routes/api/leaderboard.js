const express = require("express");
const router = express.Router();
const Stat = require("../../models/Stat");
// const validateStatsInput = require("../../validation/stat");

router.get("/", (req, res) => {
  Stat.find()
    .limit(10)
    .sort({ points: -1 })
    .then(data => res.json(data))
    .catch(err => res.status(404).json(err));
});



module.exports = router;
