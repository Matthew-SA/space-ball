const HashMap = require('hashmap')
const Matter = require("matter-js");
const ServerEngine = require('./server_engine')
const ServerPlayer = require('./server_player')

class ServerGame extends ServerEngine {
  constructor(io) {
    super()
    this.io = io
    // this.clients = new HashMap();
    this.players = new HashMap();
    this.score = {LEFT: 0, RIGHT: 0}
    this.init();
  }

  init() {
    /// server-side game loop ///
    setInterval(() => {
      Matter.Engine.update(this.engine, 20);
      // this.io.emit("to-client", {
      //   ball: {
      //     pos: this.ball.position
      //   },
      //   ships: {
      //     positions: this.getAllPos(),
      //     inputs: this.getAllInput()
      //   },
      //   score: {
      //     leftScore: this.serverEngine.leftScore,
      //     rightScore: this.serverEngine.rightScore
      //   }
      this.io.emit('to-client', {
        ball: this.ball.position,
        ships: this.getShipInfo(),
      });
    }, 20);

    // Check if ball has passed through goal sensor
    Matter.Events.on(this.engine, "collisionEnd", (event) => {
      const pairs = event.pairs;

      for (let i = 0, j = pairs.length; i !== j; ++i) {
        let pair = pairs[i];

        if (pair.bodyA === this.leftSensor || pair.bodyB === this.leftSensor) {
          this.score.RIGHT += 1;
          this.io.emit('updateScore', this.score)
          this.reset();
        } else if (pair.bodyA === this.rightSensor || pair.bodyB === this.rightSensor) {
          this.score.LEFT += 1;
          this.io.emit('updateScore', this.score)
          this.reset();
        }
      }
    });
  }

  addNewPlayer(socket) {
    // this.clients.set(socket.id, socket);
    this.players.set(socket.id, new ServerPlayer(socket.id, this.world));
    this.reset();
  }

  removePlayer(id) {
    let player = this.players.get(id)
    // this.clients.remove(id);
    this.players.remove(id);
    Matter.World.remove(this.world, player.ship)
  }

  movePlayer(id, data) {
    let player = this.players.get(id);
    if (player) player.move(data.keyboardState);
  }

  getShipInfo() {
    const players = this.players.values();
    const allShipInfo = [];
    for (let i = 0; i < players.length; i++) {
      let player = players[i];
      let shipInfo = {
        pos: player.ship.position,
        jetDirection: Object.assign({}, player.jetDirection),
      }
      allShipInfo.push(shipInfo)
      player.resetJetDirection()
    }
    return allShipInfo;
  }

  getInput(id, data){
    let player = this.players.get(id);
    player['keyboardState'] = data.keyBoardState;
  }
  // getAllInput(id, data){
  //   const players = this.players.values();
  //   const inputs = [];
  //   for (let i = 0; i < players.length; i++) {
  //     inputs.push(players[i]["keyboardState"] = data.keyboardState)
  //   }
  //   this.inputs = inputs;
  // }
  reset() {
    const players = this.players.values();
    for (let i = 0; i < players.length; i++) {
      if (i === 0) {
        Matter.Body.setPosition(players[i].ship, { x: 450, y: 450 });
        Matter.Body.setVelocity(players[i].ship, { x: 0, y: 0 });
      }
      if (i === 1) {
        Matter.Body.setPosition(players[i].ship, { x: 1150, y: 450 });
        Matter.Body.setVelocity(players[i].ship, { x: 0, y: 0 });      
      }
    }
    Matter.Body.setPosition(this.ball, { x: 800, y: 450 });
    Matter.Body.setVelocity(this.ball, { x: 0, y: 0 });
    Matter.Body.setAngularVelocity(this.ball, 0);
  }

};

module.exports = ServerGame;