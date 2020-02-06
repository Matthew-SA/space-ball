// const express = require("express");
// const router = express.Router();
// const passport = require("passport");
// const User = require("../../models/User");

// router.patch(
//   "/",
//   passport.authenticate('jwt', {session: false}),
//   (req, res) => {
//     User.findOne( {username: req.user.username })
//     .then(user => {
//       user.update(
//         { $push: { inventory: {ships: 24 }}}
//       )
//       // console.log(user)
//       // user.inventory.ships.push(selection)
      
//       // user.save(function(err) {
//       //   if (err)
//       //     res.send(err);
//       //   res.json({ message: "Ship has been added" });
//       // })
//     })
//     .catch(err => {
//       // return res.status(404).json(err)
//       console.log("FAIL")
//     });
//   }
// );


// module.exports = router;