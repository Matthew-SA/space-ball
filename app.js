
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const path = require("path");

const PORT = process.env.PORT || 5000;


// websocket dependencies
const express = require("express");
const http = require("http");
const socketIO = require('socket.io')
// const Game = require('./frontend/src/classes/game')  <-- game or gameview here?  Need server side game.
// end websocket dependencies

// Websocket Initialization
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
// const game = Game.create();  <-- create game instance and call functions to update game!
app.set('port', PORT);
// end websocket initialization


if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "public", "build", "index.html")); // TODO: change build to public?  added public currently. check path
  });
}

mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log("Connected to MongoDB successfully"))
.catch(err => console.log(err));

// import body parser to app.js to parse the JSON sent to frontend
const bodyParser = require("body-parser");


const users = require("./routes/api/users");
app.use("/api/users", users);
const stats = require("./routes/api/stats");
app.use("/api/stats", stats);


// setup some middleware for body parser:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use('/public', express.static(__dirname + '/public')); // static used for static assests!?
// app.use('/shared', express.static(__dirname + '/shared'));



// Websocket logic below
app.get("/", (req, res) => {
  res.sendFile(path.resolve("../frontend/public/index.html"));
});

io.on('connection', (socket) => {
  console.log('*** CONNECTION CREATED ***');

  socket.on('player-join', () => {
    // game.addNewPlayer(socket);
    console.log('server: user pressed a key')
  })

  socket.on('disconnect', () => {
    // game.removePlayer(socket.id)
    console.log('user disconnected')
  })
})

// Server-side game loop.  Currently runs at 60 FPS.
// setInterval(() => {
//   game.update();
//   game.sendState();
// }, 1000 / FPS);


// using server to initialize server instead of port?  need to review functionality.
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
server.listen(PORT, () => console.log(`STARTING SERVER ON PORT: ${PORT}`));
