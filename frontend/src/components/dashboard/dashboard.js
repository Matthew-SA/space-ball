import React from "react";
import MyShipContainer from "./myShip_container";
import Leaderboard from "./leaderboard";
import Lobby from "./lobby";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: "lobby" }
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

    if (selected === "lobby") {
      currentViewPort = <Lobby />;
    } else if (selected === "leaderboard") {
      currentViewPort = <Leaderboard />
    } else if (selected === "myship") {
      currentViewPort = <MyShipContainer />;
    }

    return (
      <div>
        <div className="dashboard-section">
          <div className="home-select" id="myship" onClick={this.handleClick}>My Ship</div>
          <div className="home-select active" id="lobby" onClick={this.handleClick}>Lobby</div>
          <div className="home-select" id="leaderboard" onClick={this.handleClick}>Leaderboards</div>
        </div>
        <div className="homepage-container">
          {currentViewPort}
        </div>
      </div>
    );
  }
}

export default Dashboard;
