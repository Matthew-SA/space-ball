import ClientHud from './client_hud'
import ClientGame from './client_game'
import ClientArena from './client_arena';
import Input from './Input';

class ClientViewPort {
  constructor(socket, room, user) {
    // get game canvases
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext("2d");

    // instantiate game parts
    this.hud = new ClientHud(socket)
    this.game = new ClientGame(socket, room, user);
    this.arena = new ClientArena();
    
    // assign unique user info to game
    this.socket = socket
    this.room = room
    this.user = user

    this.socket.emit('player-join', this.room)


    // apply game controls
    Input.applyEventHandlers();
  }

  init() {
    this.socket.on('gameState', (data) => {
      this.game.cycleAll(this.ctx, data)
    });
    this.gameLoop();
  }

  gameLoop() {
    Input.applyEventHandlers();
    setInterval(() => {
      if (!this.cooldown && (Input.LEFT || Input.UP || Input.RIGHT || Input.DOWN)) {
        this.socket.emit('player-action', {
          room: this.room,
          keyboardState: {
            left: Input.LEFT,
            right: Input.RIGHT,
            up: Input.UP,
            down: Input.DOWN
          }
        });
      }
    }, 20);
  }

  // clear(ctx) {
  //   this.game.clearEntities(ctx);
  // }

  // step(data) {
  //   this.game.stepEntities(data);
  // }

  // draw(ctx) {
  //   this.game.drawEntities(ctx);
  // }
}

export default ClientViewPort;