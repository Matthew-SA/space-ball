import React from 'react';
import NavBarContainer from './navbar/navbar_container';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div className="mainpage-container">
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="clouds"></div>
      <div className="moon"></div>
      <NavBarContainer />
      <div className="content">
        <img className="logo" src="images/space_ball.png" width="600" alt="logo" />
        <Link to="/play"><div className="button play-button">PLAY</div></Link>
      </div>
    </div>
  )
}

export default MainPage;