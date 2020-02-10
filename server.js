const mongoose = require("mongoose");
const express = require("express");
const db = require("./config/keys").mongoURI;
const bodyParser = require("body-parser");
const passport = require("passport");
const Matter = require("matter-js")

const users = require("./routes/api/users");
const stats = require("./routes/api/stats");
const leaderboard = require("./routes/api/leaderboard");
const inventory = require("./routes/api/inventory");

const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;


app.use(passport.initialize());
require("./config/passport")(passport);

// setup some middleware for body parser:
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")); 
  });
}

app.use("/api/users", users);
app.use("/api/stats", stats);
app.use("/api/leaderboard", leaderboard);
app.use("/api/inventory", inventory);

// websocket dependencies
const http = require("http");
const socketIO = require('socket.io')
const ServerGame = require('./lib/server_game');
// end websocket dependencies

// Websocket Initialization
const server = http.createServer(app);
const io = socketIO(server, {
  pingInterval: 3000,
  pingTimeout: 3000,
});

const serverGame = new ServerGame;
// console.log(data.bodies[0])
// console.log(serverEngine.world.bodies)

app.set('port', PORT);
// end websocket initialization

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

mongoose.set('useFindAndModify', false);

// app.use('/public', express.static(__dirname + '/public')); // static used for static assests!?
// app.use('/shared', express.static(__dirname + '/shared'));

// Websocket logic below
app.get("/", (req, res) => {
  res.sendFile(path.resolve("../frontend/public/index.html"));
});

io.on('connection', (socket) => {
  socket.removeAllListeners()
  socket.on('player-join', () => {
    serverGame.addNewPlayer(socket);
  });

  socket.on('player-action', data => {
    console.log(data)
    serverGame.movePlayer(socket.id, data)
  });
  
  socket.on('disconnect', () => {
    serverGame.removePlayer(socket.id,socket)
    console.log('user disconnected')
  })
})

/// server-side game loop ///
setInterval(function () {
  Matter.Engine.update(serverGame.engine, 20);
  io.emit('to-client', {
    ball: {
      pos: serverGame.ball.position,
    },
    ships: serverGame.getAllPos(),
    score: {
      leftScore: serverGame.serverEngine.leftScore,
      rightScore: serverGame.serverEngine.rightScore
    }
  });
}, 20);

server.listen(PORT, () => console.log(`STARTING SERVER ON PORT: ${PORT}`));
