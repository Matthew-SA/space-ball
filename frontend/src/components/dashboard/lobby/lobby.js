import React from "react";

function Lobby() {
  return (
    <div className="lobby-container">
      <img src="images/space_jam.png" width="800"/>
      <a href="#/game"><div className="play">Play</div></a>
    </div>
  );
};

export default Lobby;