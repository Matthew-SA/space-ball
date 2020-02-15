import React from "react";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  loginLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="loggedin">
          <div className="greeting">Hello {this.props.user.username} !</div>
          <button className="logout-button" onClick={this.logoutUser}>Log Out</button>
        </div>
      );
    } else {
      return (
        <div className="loggedout">
          <Link to="/login"><button className="login-button" id="login">Log In</button></Link>
        </div>
      );
    }
  }

  render() {

    return (
      <div >
        <div className="navbar">
          <Link to="/options"><div className="home-select" id="options" >Options</div></Link>
          <Link to="/play"><div className="home-select" id="play">Play</div></Link>
          <Link to="/leaderboard"><div className="home-select" id="leaderboard">Leaderboards</div></Link>
        </div>
        <div className="greeting-container">
          <svg className="home-button" viewBox="0 0 24 24">
            <path fill="currentColor" d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
          </svg>
          {this.loginLinks()}
        </div>
        
      </div>
    );
  }
}

export default NavBar;
