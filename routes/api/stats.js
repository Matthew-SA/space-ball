const express = require('express');
const router = express.Router();
const validateStatsInput = require('../../validation/stat');
const passport = require("passport");
const Stat = require('../../models/Stat');

router.get(
  "/",
  passport.authenticate('jwt', {session: false }),
  (req, res) => {
    Stat.findOne({ username: req.user.username })
      .then(stat => {
        return res.json(stat)
      })
      .catch(err => {
        return res.status(404).json(err)
      });
  }
);

router.post("/", (req, res) => {
  const { errors, isValid } = validateStatsInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const stat = new Stat({
    username: req.body.username,
    points: 0,
    wins: 0,
    losses: 0
  });

  stat.save().then(data => res.json(data));
});

module.exports = router;