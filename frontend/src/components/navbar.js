import React from "react";
import OptionsContainer from "./options/options_container";
import Leaderboard from "./leaderboard/leaderboard";
import Play from "./lobby/play";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: "Play" }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({
      selected: e.target.id
    });
    Array.from(document.getElementsByClassName('home-select')).forEach(el => el.classList.remove('active'));
    e.target.classList.add('active');
  }

  render() {
    const selected = this.state.selected;
    let currentViewPort;

    if (selected === "play") {
      currentViewPort = <Play />;
    } else if (selected === "leaderboard") {
      currentViewPort = <Leaderboard />
    } else if (selected === "options") {
      currentViewPort = <OptionsContainer />;
    }

    return (
      <div className="homepage-container">
        <div className="dashboard">
          <div className="home-select" id="options" onClick={this.handleClick}>Options</div>
          <div className="home-select active" id="play" onClick={this.handleClick}>Play</div>
          <div className="home-select" id="leaderboard" onClick={this.handleClick}>Leaderboards</div>
        </div>
        {currentViewPort}
      </div>
    );
  }
}

export default Dashboard;
