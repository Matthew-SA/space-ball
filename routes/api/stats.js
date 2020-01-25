const express = require('express');
const router = express.Router();
const Stat = require('../../models/Stat');
const validateStatsInput = require('../../validation/stat');

// router.get("/test", (req, res) => res.json({ msg: "Stats Works" }));

router.get(
  "/",
  (req, res) => {
    const errors = {};
    Stat.find()
      .find({"points": {$gte: 1}})
      .limit(10)
      .sort({points: -1})
      .then(data => res.json(data))
      .catch(err => res.status(404).json(err));
  }
);

router.post(
  "/",
  (req, res) => {
    const { errors, isValid } = validateStatsInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const stat = new Stat({
      username: req.body.username,
      points: req.body.points,
      wins: req.body.wins,
      losses: req.body.losses 
    });

    stat.save().then(data => res.json(data));
  }
);

module.exports = router;