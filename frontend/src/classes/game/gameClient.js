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
    this.world = this.engine.world;
    this.selfShip = this.createShip();
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

    //used for animate() method, responsible for listening for player input.
    this.animationFrameId = 0;

    // setInterval(() => {
    //   console.log('test!')
    // }, 1000);
    setInterval(() => {
      this.socket.emit('test', 'TEST!')
    }, 1000);

    // this.socket.emit('test', (data) => {
    //   console.log(data)
    // })
  };

  init(){
    let that = this;
    this.socket.on('update', data => {
      that.receiveGameState(data);
      // we originally had a method to create the selfShip here.
    });
    this.socket.emit('player-join');
  };

  //get update() to run constantly using requestAnimationFrame (temp solution, not fully understood)
  // animate(){
  //   this.animationFrameId = window.requestAnimationFrame(
  //     Util.bind(this, this.update)
  //   );
  // };
  //

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

  createShip() {
    const ship = Matter.Bodies.circle(200, 300, 30, {
      isStatic: true,
      render: {
        sprite: {
          texture: "images/default_ship.png"
        }
      }
    });
    Matter.World.add(this.world, ship);
  }
};

module.exports = GameClient;