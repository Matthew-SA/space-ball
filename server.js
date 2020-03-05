const mongoose = require("mongoose");
const express = require("express");
const db = require("./config/keys").mongoURI;
const bodyParser = require("body-parser");
const passport = require("passport");
// const Matter = require("matter-js")

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
const ServerRoom = require('./lib/server_room')
const ServerGame = require('./lib/server_game');
// end websocket dependencies



mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

mongoose.set('useFindAndModify', false);

app.use('/public', express.static(__dirname + '/public')); // static used for static assests!?
// app.use('/shared', express.static(__dirname + '/shared'));


// Websocket server Initialization
const server = http.createServer(app);
const io = socketIO(server, {
  pingInterval: 3000,
  pingTimeout: 3000,
});
app.set('port', PORT);
// end websocket server initialization


app.get("/", (req, res) => {
  res.sendFile(path.resolve("../frontend/public/index.html"));
});



// Websocket logic below
const clients = {};
const gameList = {};

io.on('connection', (socket) => {
  console.log('*** user connected ***')

  // lobby room logic /////////////////////////
  socket.on('request-gamelist', () => {
    io.in('room-lobby').emit('send-gamelist', Object.keys(gameList))
  })

  socket.on('enter-room', roomNum => {
    clients[socket.id] = roomNum;
    socket.join("room-" + roomNum)
  })
  
  socket.on('leave-room', roomNum => {
    delete clients[socket.id]
    socket.leave("room-" + roomNum)
  })
  //////////////////////////////////////////////

  // gameplay socket interactions //////////////
  socket.on('join-game', data => {
    if (!gameList[data.room]) gameList[data.room] = new ServerRoom(data.room)
    gameList[data.room].addPlayer(socket.id, data.username, data.options)
  });

  socket.on('request-game-start', roomNum => {
    let newGame = new ServerGame(io, roomNum, gameList[roomNum].roster);
    gameList[roomNum] = newGame;
  })

  socket.on('player-action', data => {
    let game = gameList[data.room];
    game.movePlayer(socket.id, data)
  });

  socket.on('leave-game', roomNum => {
    let game = gameList[roomNum]
    game.removePlayer(socket.id)
    if ([...game.roster.keys()].length <= 0) delete gameList[roomNum]
  })
  //////////////////////////////////////////////

  // client disconnect logic: delete from client list and remove from game.
  socket.on('disconnect', () => {
    let roomNum = clients[socket.id]
    delete clients[socket.id]

    let game = gameList[roomNum]
    if (game) {
      game.removePlayer(socket.id)
      if (game.players.length <= 0) delete gameList[roomNum]
    }
    console.log('*** user disconnected ***')
  })
})


// debugger tools
// setInterval(() => {
  // console.log("clients", clients)
  // console.log("game", Object.keys(gameList))
//   io.in('lobby').emit('test', 'testing...')
// }, 1000);

server.listen(PORT, () => console.log(`STARTING SERVER ON PORT: ${PORT}`));
