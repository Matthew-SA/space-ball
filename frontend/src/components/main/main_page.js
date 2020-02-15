import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../navbar';

const MainPage = () => {
  return (
    <div className="mainpage-container">
      <NavBar />
      <div className="lobby-content">
        <img className="logo" src="images/space_ball.png" width="600" alt="logo" />
        <Link to="/play" className="play">Play</Link>
      </div>
    </div>
  )
}

export default MainPage;