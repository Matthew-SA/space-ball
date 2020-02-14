import React from "react";
import TableContainer from "./table_container";
import MyStatsContainer from "./myStats/myStats_container";

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: "leader" };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({
      selected: e.target.id
    });
    Array.from(document.getElementsByClassName("board-select")).forEach(el =>
      el.classList.remove("active")
    );
    e.target.classList.add("active");
  }

  render() {
    const selected = this.state.selected;
    let currentViewPort;

    if (selected === "leader") {
      currentViewPort = <TableContainer />;
    } else if (selected === "stats") {
      currentViewPort = <MyStatsContainer />;
    }

    return (
      <div className="leaderboard-section">
        <div className="leaderboard">
          <div className="leaderboard-menu">
            <div className="board-select active" id="leader" onClick={this.handleClick}>
              Leaderboard
            </div>
            <div className="board-select" id="stats" onClick={this.handleClick}>
              My Stats
            </div>
          </div>
          {currentViewPort}
        </div>
      </div>
    );
  }
};

export default Leaderboard;