import React from "react";
import LoginFormContainer from "../session/login_form_container";
import SignupFormContainer from "../session/signup_form_container";


class MyShip extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }


  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div>
          <div className="logout-container">
            <button className="logout-button" onClick={this.logoutUser}>
              Log Out
            </button>
          </div>
          <div className="customize-ship-container">
            <div className="customize-panel">Customize Ship Box</div>
            <div className="ship-picture-container">
              <img
                src="images/ship.png"
                className="ship"
                alt="ship"
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="login-prompt">You must be logged in to customize your ship</div>
          <div><LoginFormContainer /></div>
          <div><SignupFormContainer /></div>
        </div>
      );
    }
  }


  render() {
    return (
    <div>
      {this.getLinks()}
    </div>
    );
  }
};

export default MyShip;