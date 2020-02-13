import React from "react";
import { Link } from "react-router-dom";



function Lobby() {

  function handleClick(e) {

    Array.from(document.getElementsByClassName('lobby-content')).forEach(el => {

      if (Array.from(el.classList).includes("hidden")) {
        el.classList.remove('hidden')
      } else {
        el.classList.add('hidden')
      }
    });
    
  }

  return (
    <div>
      <div className="lobby-container">
        <center>
          <div className="lobby-content">
            <img className="logo" src="images/space_ball.png" width="600" alt="logo"/>
            <div className="play" onClick={handleClick}>Play</div>
          </div>
          <div className="lobby-content hidden game-lobby">
            <div className="play-container">
              <div className="title link">Create Lobby</div>
            </div>
            <div className="play-container">
              <div className="title">Join Lobby</div>
              <br />
              <input className="input-field" type="text"></input>
              <center>
                <div className="join-button">Join</div>
              </center>
            </div>
            <div className="play-container">
              <div className="title">How To Play:</div>
                <div className="instructions">Push the ball towards the oppenent's goal. <br /> 
                  Score by getting the ball into the goal. <br />
                  Move your ship with WASD. <br />
                  First to 10 points wins.  
                <br />
              </div>
            </div>
            <div className="buy-button" onClick={handleClick}>Go Back</div>
            <Link to="/waitingroom"><div className="buy-button">Lobby 1</div></Link>
            <Link to="/waitingroom"><div className="buy-button">Lobby 1</div></Link>
          </div>
        </center>
      </div>
    </div>
  );
};

export default Lobby;