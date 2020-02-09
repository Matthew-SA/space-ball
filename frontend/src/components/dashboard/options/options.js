import React from "react";
import LoginFormContainer from "../session/login_form_container";
import SignupFormContainer from "../session/signup_form_container";
import ToggleContainer from "./toggle_container";

class Options extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "ship",
    };

    this.logoutUser = this.logoutUser.bind(this);
    this.loginLinks = this.loginLinks.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({ selected: e.target.id });
    Array.from(document.getElementsByClassName("customize")).forEach(el =>
      el.classList.remove("active")
    );
    e.target.classList.add("active");
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  showLogin(e) {
    this.setState({selected: e.target.id})
    this.props.clearErrors();
  }

  loginLinks() {
    if (this.props.loggedIn) {
      return (
        <div>
          <div className="greeting-container">
            <div className="greeting">Hello {this.props.user.username} !</div>
            <button className="logout-button" onClick={this.logoutUser}>Log Out</button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="greeting-container">
            <button className="login-button" id="login" onClick={this.showLogin}>Log In</button>
          </div>
        </div>
      );
    }
  }

  render() {
    const selected = this.state.selected;
    let viewPort;

    if (this.props.loggedIn) {
      viewPort = <ToggleContainer />      
    } else {
      if (selected === "login" ) { viewPort = 
        <div className="picture-container">
          <div className="login-container" id="login">
            <div className="login-prompt">Log In to Buy Items</div>
            <LoginFormContainer />
            <SignupFormContainer />
            <div className="back" id="ship" onClick={this.handleClick}>BACK</div>
          </div>
        </div>
      } else {
        viewPort = <ToggleContainer />
      }
    }

    return (
      <div>
        {this.loginLinks()}
        {viewPort}
      </div>
    );
  }
};

export default Options;