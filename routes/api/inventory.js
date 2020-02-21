const express = require('express');
const router = express.Router();
const passport = require("passport");
const Inventory = require('../../models/Inventory');

router.get("/", passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Inventory.findOne({ username: req.user.username })
      .then(inventory => {
        return res.json(inventory)
      })
      .catch(err => {
        return res.status(404).json(err)
      });
  });

router.post("/", (req, res) => {
  const inventory = new Inventory({
    username: req.body.username,
    currency: 1000,
    ships: ["Default"],
    balls: ["Earth"],
    gameoptions: { ship: "Default", ball: "Earth" }
  });
  inventory.save().then(data => res.json(data));
});

router.patch("/addship", passport.authenticate('jwt', { session: false }),
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
  });

router.patch("/removeship", passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Inventory.findOneAndUpdate(
      { username: req.user.username },
      { $pull: { ships: req.body.ship} }
    )
    .then(inventory => {
      return res.json(inventory);
    })
    .catch(err => {
      return res.status(404).json(err);
    })
  });

router.patch("/addball", passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Inventory.findOneAndUpdate(
      { username: req.user.username },
      { $push: { balls: req.body.ball } }
    )
    .then(inventory => {
      return res.json(inventory);
    })
    .catch(err => {
      return res.status(404).json(err);
    });
  });

router.patch("/removeball", passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Inventory.findOneAndUpdate(
      { username: req.user.username },
      { $pull: { balls: req.body.ball } }
    )
      .then(inventory => {
        return res.json(inventory);
      })
      .catch(err => {
        return res.status(404).json(err);
      })
  });
    
router.patch("/currency", passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Inventory.findOneAndUpdate(
      { username: req.user.username },
      { $inc: { currency: req.body.currency } }
    )
      .then(currency => {
        return res.json(currency);
      })
      .catch(err => {
        return res.status(404).json(err);
      });
  });

router.patch("/selectship", passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Inventory.findOneAndUpdate(
      { username: req.user.username},
      { $set: {"gameoptions.ship": req.body.gameoptions} }
    )
    .then(selected => {
      return res.json(selected);
    })
    .catch(err => {
      return res.status(404).json(err);
    });
  });

router.patch("/selectball", passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Inventory.findOneAndUpdate(
      { username: req.user.username},
      { $set: {"gameoptions.ball": req.body.gameoptions} }
    )
    .then(selected => {
      return res.json(selected);
    })
    .catch(err => {
      return res.status(404).json(err);
    });
  });



module.exports = router;