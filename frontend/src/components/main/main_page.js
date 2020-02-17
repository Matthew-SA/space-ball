import React from 'react';
import NavBarContainer from './navbar/navbar_container';

const MainPage = () => {
  return (
    <div className="mainpage-container">
      <NavBarContainer />
      <div className="lobby-content">
        <img className="logo" src="images/space_ball.png" width="600" alt="logo" />
      </div>
    </div>
  )
}

export default MainPage;