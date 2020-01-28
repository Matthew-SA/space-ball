const mongoose = require("mongoose");
const express = require("express");
const db = require("./config/keys").mongoURI;
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const stats = require("./routes/api/stats");
const leaderboard = require("./routes/api/leaderboard");

const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;

app.use(passport.initialize());
require("./config/passport")(passport);

// setup some middleware for body parser:
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/stats", stats);
app.use("/api/leaderboard", leaderboard);

// websocket dependencies
const http = require("http");
const socketIO = require('socket.io')
const Game = require('./lib/Game')  
// end websocket dependencies

// Websocket Initialization
const server = http.createServer(app);
const io = socketIO(server);
const game = Game.create(); 
app.set('port', PORT);
// end websocket initialization

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")); // TODO: change build to public?  added public currently. check path
  });
}

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

// app.use('/public', express.static(__dirname + '/public')); // static used for static assests!?
// app.use('/shared', express.static(__dirname + '/shared'));

// Websocket logic below
app.get("/", (req, res) => {
  res.sendFile(path.resolve("../frontend/public/index.html"));
});

io.on('connection', (socket) => {
  console.log('*** CONNECTION CREATED ***');
  socket.broadcast.emit('hi!')

  socket.on('test-function', (data) => {
    // console.log(data)
  })

  socket.on('player-action', (data) => {
    // console.log(data)
    game.updatePlayerOnInput(socket.id, data);
  });

  socket.on('player-join', () => {
    game.addNewPlayer(socket);
    console.log('user joined')
  })

  socket.on('disconnect', () => {
    game.removePlayer(socket.id)
    // console.log('user disconnected')
  })
})

// Server-side game loop.  Currently runs at 60 FPS.
const FPS = 60
setInterval(() => {
  game.update();
  game.sendState();
}, 1000 / FPS);

// using server to initialize server instead of port?  need to review functionality.
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
server.listen(PORT, () => console.log(`STARTING SERVER ON PORT: ${PORT}`));
