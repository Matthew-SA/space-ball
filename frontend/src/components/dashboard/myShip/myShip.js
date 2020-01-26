import React from "react";
import LoginFormContainer from "../session/login_form_container";
import SignupFormContainer from "../session/signup_form_container";
import CustomizeContainer from "./customize_container";


class MyShip extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
    this.props.clearStats();
  }
  
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div>
          <div className="greeting-container">
            <div className="greeting">Hello {this.props.user.username} !</div>
            <button className="logout-button" onClick={this.logoutUser}>
              Log Out
            </button>
          </div>
          <CustomizeContainer />
        </div>
      );
    } else {
      return (
        <div className="myship-login">
          <div className="login-prompt">You must be logged in to customize your ship</div>
          <div><LoginFormContainer /></div>
          <div><SignupFormContainer /></div>
        </div>
      );
    }
  }

  render() {
    // debugger
    return (
    <div>
      {this.getLinks()}
    </div>
    );
  }
};

export default MyShip;