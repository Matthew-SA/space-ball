import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div className="homepage-container">
        <div className="lobby-container">
          <div className="lobby-content">
            <img className="logo" src="images/space_ball.png" width="600" alt="logo" />
            <Link to="/play" className="play">Play</Link>
          </div>
      </div>
    </div>
  )
}

export default MainPage;