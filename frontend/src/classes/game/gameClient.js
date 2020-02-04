// import Input from './Input';
// import Util from './Util';
// import Matter from 'matter-js';
const Input = require('./Input');
const Matter = require('matter-js');

class GameClient {
  constructor(socket){
    this.socket = socket;
    this.canvas = document.getElementById('game-canvas');
  }
}

module.exports = GameClient;