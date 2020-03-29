import React from "react";
// import LoginFormContainer from "../../../session/login_form_container";
// import SignupFormContainer from "../../../session/signup_form_container";

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.getLinks = this.getLinks.bind(this);
  }

  getLinks() {
    const stats = this.props.stats;
    const ratio = stats.wins / (stats.wins + stats.losses);
    const winpercent = (ratio ? (ratio * 100).toFixed(2) : 0);

    if (this.props.loggedIn) {
      return (
        <table className="stats-table">
          <thead>
            <tr className="stats-title">
              <td className="stats-points">POINTS</td>
              <td className="stats-wins">WINS</td>
              <td className="stats-losses">LOSSES</td>
              <td className="stats-winloss">WIN %</td>
            </tr>
          </thead>
          <tbody className="stats-body">
            <tr>
              <td className="stats-data">{stats.points}</td>
              <td className="stats-data">{stats.wins}</td>
              <td className="stats-data">{stats.losses}</td>
              <td className="stats-data">{winpercent}%</td>
            </tr>
          </tbody>
        </table>
      );
    } else {
      return (
        <div className="login-prompt">You must be logged in to view your stats</div>
      )
    }

  }

  render() {
    return <div className="stats-content">{this.getLinks()}</div>;
  }
}

export default Stats;
