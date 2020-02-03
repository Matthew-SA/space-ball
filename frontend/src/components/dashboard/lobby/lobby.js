import React from "react";

function Lobby() {
  return (
    <div className="lobby-container">
      <img className="logo" src="images/space_jam.png" width="600" alt="logo"/>
      <a href="#/game"><div className="play">Play</div></a>
    </div>
  );
};

export default Lobby;