import React from "react";
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   active: 'home'
    // }
    this.logoutUser = this.logoutUser.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    // this.setState({
    //   active: e.target.id
    // });
    Array.from(document.getElementsByClassName("nav-select")).forEach(el =>
      el.classList.remove("active")
    );

    e.target.classList.add("active");

    const arr = Array.from(document.getElementsByClassName("nav-select"))
    console.log(arr)
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  loginLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="loggedin">
          <div className="greeting">Hello {this.props.user.username} !</div>
          <button className="button logout-button" onClick={this.logoutUser}>LOG OUT</button>
        </div>
      );
    } else {
      return (
        <div className="loggedout">
          <Link to="/login"><button className="button login-button" id="login">LOG IN</button></Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="navbar">
        <div className="nav">
          <Link to="/" >
            <svg className="nav-select home-button active" id="home" 
              viewBox="0 0 24 24" onClick={this.handleClick}>
              <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
            </svg>
            {/* <img className="logo" src="images/space_ball.png" width="200" alt="logo" /> */}
          </Link>
          <Link to="/play">
            <div className="nav-select" id="play" onClick={this.handleClick}>PLAY</div>
          </Link>
          <Link to="/about" >
            <div className="nav-select" id="about" onClick={this.handleClick}>ABOUT</div>
          </Link>
          {/* <Link to="/play" >
            <div className="nav-select" id="play" onClick={this.handleClick}>PLAY</div>
          </Link> */}
          {/* <Link to="/howtoplay" >
            <div className="nav-select" id="howtoplay" onClick={this.handleClick}>HOW TO PLAY</div>
          </Link> */}
          <Link to="/options" >
            <div className="nav-select" id="options" onClick={this.handleClick}>OPTIONS</div>
          </Link>
          <Link to="/leaderboard" >
            <div className="nav-select" id="leaderboard" onClick={this.handleClick}>LEADERBOARD</div>
          </Link>
          {/* <Link to="/play" >
            <div className="button play-button">PLAY</div>
          </Link> */}
        </div>
        {this.loginLinks()}
      </div>
    );
  }
}

export default NavBar;
