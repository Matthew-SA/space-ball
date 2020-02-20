import React from "react";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchLeaderboard();
  }

  render() {
    const leaderboard = this.props.leaderboard;
    let counter = 0;
    return (
      <table className="leaderboard-table">
        <thead>
          <tr className="table-title">
            <td className="column-rank">RANK</td>
            <td className="column-player">PLAYER</td>
            <td className="column-stat">POINTS</td>
            <td className="column-wins">WINS</td>
            <td className="column-losses">LOSSES</td>
          </tr>
        </thead>
        <tbody className="table-body">
          {leaderboard.map(el => (
            <tr key={counter}>
              <td>#{(counter += 1)}</td>
              <td className="player-name column-player">{el.username}</td>
              <td>{el.points}</td>
              <td>{el.wins}</td>
              <td>{el.losses}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Board;
