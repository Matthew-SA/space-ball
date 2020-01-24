import React from "react";

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchStats();
  }

  render() {
    const leaderboard = this.props.leaderboard;
    let counter = 0;
    return (
      <div className="leaderboard-container">
        <table className="table">
          <thead>
            <tr className="leaderboard-title">
              <td className="column-rank">RANK</td>
              <td className="column-player">PLAYER</td>
              <td className="column-stat">POINTS</td>
              {/* <td className='column-stat'>WINS</td> */}
              {/* <td className='column-stat'>LOSSES</td> */}
            </tr>
          </thead>
          <tbody>
            {leaderboard.map(el => (
              <tr key={counter}>
                <td>#{(counter += 1)}</td>
                <td className="player-name column-player">{el.username}</td>
                <td>{el.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
