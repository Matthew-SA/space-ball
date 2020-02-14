import React from "react";
import LoginFormContainer from "../../session/login_form_container";
import SignupFormContainer from "../../session/signup_form_container";

class MyStats extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  // componentDidMount() {
  //   this.props.fetchStats();
  // }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  getLinks() {
    const stats = this.props.stats;
    const ratio = stats.wins / (stats.wins + stats.losses);
    const winpercent = (ratio ? (ratio * 100).toFixed(2) : 0 );
      
    if (this.props.loggedIn) {
      return (
        <table className="stats-table">
          <thead>
            <tr className="stats-title">
              <td className="column-points">POINTS</td>
              <td className="column-wins">WINS</td>
              <td className="column-losses">LOSSES</td>
              <td className="column-winloss">WIN %</td>
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
        <div className="mystats-login">
          <div className="login-prompt">
            You must be logged in to view your stats
          </div>
          <div>
            <LoginFormContainer />
          </div>
          <div>
            <SignupFormContainer />
          </div>
        </div>
      );
    }
  }

  render() {
    return <div>{this.getLinks()}</div>;
  }
}

export default MyStats;
