// import serverGame from './server_game'


class ServerRoom {
  constructor(room) {
    this.room = room;
    this.roster = new Map();
  }

  addPlayer(id, username, gameOptions) {
    this.roster.set(id, {
      user: username,
      team: 'neutral',
      // team: gameOptions.team,
      ship: gameOptions.ship,
      ball: gameOptions.ball,
    });
  }

  removePlayer(id) {
    this.roster.delete(id);
  }
}

module.exports = ServerRoom;