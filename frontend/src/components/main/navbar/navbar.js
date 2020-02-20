import React from "react";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  loginLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="loggedin">
          <button className="logout-button" onClick={this.logoutUser}>Log Out</button>
          <div className="greeting">Hello {this.props.user.username} !</div>
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
      <div className="navbar">
        <div className="nav">
          <Link to="/" activeclassname="active">
            <svg className="home-select home-button" viewBox="0 0 24 24">
              <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
            </svg>
          </Link>
          <Link to="/play" activeclassname="active">
            <div className="home-select" id="play">PLAY</div>
          </Link>
          <Link to="/options" activeclassname="active">
            <div className="home-select" id="options" >OPTIONS</div>
          </Link>
          <Link to="/leaderboard" activeclassname="active">
            <div className="home-select" id="leaderboard">LEADERBOARD</div>
          </Link>
        </div>
        {this.loginLinks()}
      </div>
    );
  }
}

export default NavBar;
