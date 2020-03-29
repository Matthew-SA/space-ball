import React from 'react';
import NavBarContainer from '../navbar/navbar_container';

const About = () => {
  return (
    <div className="mainpage-container">
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="clouds"></div>
      <NavBarContainer />
      <div className="content">
        <div className="welcome">Welcome to SpaceBall</div>
        <div className="about">
          SpaceBall is a multiplayer rocket league inspired game, where the 
          objective is to score points by getting the ball into your opponents 
          goal. Players use their ship to guide balls across the map, while also
          working to disrupt their opponents' efforts.
        </div>
        {/* <div className="box instructions">
          <div className="howto">
            Use the 'WASD' keys to navigate your ship through space.
            Crush your opponents with
            your mastery of physics and space.
          </div>
          <div className="wasd">
            <img src="images/wasd.png" width="130" alt="wasd"></img>
          </div>
        </div> */}
        <div className="team-description">This evolving passion 
        project utilizes the following technologies: <br /> 
        MERN stack, Canvas, Matter.js, Socket.io</div>
        <div className="team">
          <div><img className="profile" src="images/matt.jpeg"></img><br />Matthew Andreson</div>
          <div><img className="profile" src="images/julie.jpeg"></img><br />Julie Adams</div>
          <div><img className="profile" src="images/joe.jpeg"></img><br />Joseph Lee</div>
          <div><img className="profile" src="images/chris.jpeg"></img><br />Chris Yun</div>
        </div>
      </div>
    </div>
  )
}

export default About;