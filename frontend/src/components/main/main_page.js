import React from "react";
import NavBarContainer from "../nav/navbar_container";

class MainPage extends React.Component {
  render() {
    return (
      <div className="homepage-container">
        <h1 className="intro-title">Space Jam</h1>
        <NavBarContainer />
        
      </div>
    );
  }
}

export default MainPage;
