// import serverGame from './server_game'


class ServerRoom {
  constructor(room) {
    this.room = room;
    this.roster = new Map();
  }

  addPlayer(id, username, gameOptions) {
    // console.log('ROOM#:', this.room)
    this.roster.set(id, {
      user: username,
      team: gameOptions.team,
      ship: gameOptions.ship,
      ball: gameOptions.ball,
    });
    // console.log(this.roster)
  }

  removePlayer(id) {
    this.roster.delete(id);
    // console.log(this.roster)
  }
}

module.exports = ServerRoom;