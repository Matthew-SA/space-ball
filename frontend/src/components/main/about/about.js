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
        <div className="team-description">
          This evolving passion project utilizes the following technologies: <br /> 
          MERN stack, Canvas, Matter.js, Socket.io</div>
        <div className="team">
          <a href="https://www.linkedin.com/in/matthew-andresen-ab8a5b191/" target="_blank">
            <div className="name">
              <img className="profile" src="images/matt.jpeg" alt="matt"></img>
              <br />Matthew Andreson
            </div>
          </a>
          <a href="https://www.linkedin.com/in/julie-adams-61767363/" target="_blank">
            <div className="name">
              <img className="profile" src="images/julie.jpeg" alt="julie"></img>
              <br />Julie Adams
            </div>
          </a>
          <a href="https://www.linkedin.com/in/josephinlee/" target="_blank">
            <div className="name">
              <img className="profile" src="images/joe.jpeg" alt="joe"></img>
              <br />Joseph Lee
            </div>
          </a>
          <a href="https://www.linkedin.com/in/christopher-yun/" target="_blank">
            <div className="name">
              <img className="profile" src="images/chris.jpeg" alt="chris"></img>
              <br />Chris Yun
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default About;