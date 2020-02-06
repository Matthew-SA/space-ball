const express = require('express');
const router = express.Router();
const passport = require("passport");
const Inventory = require('../../models/Inventory');

router.get(
  "/",
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Inventory.findOne({ username: req.user.username })
      .then(inventory => {
        return res.json(inventory)
      })
      .catch(err => {
        return res.status(404).json(err)
      });
  }
);

router.post("/", (req, res) => {
  const inventory = new Inventory({
    username: req.body.username,
    ships: ["Default"],
    balls: ["Earth"],
    selected: ["Default", "Earth"]
  });
  inventory.save().then(data => res.json(data));
});

router.patch(
  "/ships", 
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Inventory.findOneAndUpdate(
      { username: req.user.username },
      { $push: { ships: req.body.ship } }
    )
    .then(inventory => {
      return res.json(inventory);
    })
    .catch(err => {
      return res.status(404).json(err);
    });
})
    

module.exports = router;