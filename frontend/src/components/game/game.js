import React from 'react';
import NavBarContainer from "../nav/navbar_container";

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <NavBarContainer />
        <div>
          <canvas></canvas>
        </div>
      </div>
    );
  }
};

export default Game;