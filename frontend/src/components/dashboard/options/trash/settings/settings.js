import React from "react";
import LoginFormContainer from "../../../session/login_form_container";
import SignupFormContainer from "../../../session/signup_form_container";

class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: "ship"
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({ selected: e.target.id });
    Array.from(document.getElementsByClassName("customize")).forEach(el =>
      el.classList.remove("active")
    );
    e.target.classList.add("active");
    // const loginSwitch = document.getElementById("login");
    // loginSwitch.style.visibility = "hidden";

  }

  render() {
    const selected = this.state.selected;


    return (
      <div className="options-container">
        <div className="customize-panel">
          <div className="customize-title">Game Options</div>
          <div className="select-customization">
            <div className="customize active" id="ship" onClick={this.handleClick}>
              Ship
            </div>
            <div className="customize" id="ball" onClick={this.handleClick}>
              Ball
            </div>
          </div>
          {/* {currentViewPort} */}
        </div>
        <div className="picture-container">
          {/* {rightView}
          {purchaseOption} */}
          <div className="login-container" id="login">
            <div className="login-prompt">Log In to Buy Items</div>
            <LoginFormContainer />
            <SignupFormContainer />
          </div>

        </div>
      </div>
    );
  }
}


export default Settings;