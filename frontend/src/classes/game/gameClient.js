// import Input from './Input';
// import Util from './Util';
// import Matter from 'matter-js';
const Input = require('./Input');
const Matter = require('matter-js');

class GameClient {
  constructor(socket){
    this.socket = socket;
    this.canvas = document.getElementById('game-canvas');
    this.engine = Matter.Engine.create();
    this.world = null;
    this.selfShip = null;
    this.otherShips = [];
    this.leftGoal = null;
    this.rightGoal = null;
    this.walls = [];
    // this.leftScore = 0;
    // this.rightScore = 0;
    // this.gameOver = false;
    // this.winner = null;
    this.render = this.render();
    Matter.Render.run(this.render);
  };

  init(){
    let that = this;
    this.socket.on('update', data => {
      that.receiveGameState(data);
      // we originally had a method to create the selfShip here.
    });
    this.socket.emit('player-join');
  };

  update(){
    if(this.selfPlayer){
      this.socket.emit('player-action', {
        keyboardState: {
          left: Input.LEFT,
          right: Input.RIGHT,
          up: Input.UP,
          down: Input.DOWN
        },
      });
    };
  };

  receiveGameState(state){
    this.selfShip = state['self'];
    this.otherPlayers = state['players'];
  };

  render(){
    let render = Matter.Render.create({
      canvas: this.canvas,
      engine: this.engine,
      options: {
        width: 1000,
        height: 600,
        background: "images/space.png",
        // sprite: {
        //   texture:
        //     "https://upload.wikimedia.org/wikipedia/commons/7/7f/PIA23165-Comet-C2018Y1-Animation-20190225.gif"
        // },
        wireframes: false,
        showAngleIndicator: false
      }
    });
    return render;
  };
};

module.exports = GameClient;