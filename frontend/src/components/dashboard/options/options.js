import React from "react";
import LoginFormContainer from "../session/login_form_container";
import SignupFormContainer from "../session/signup_form_container";
import ShopContainer from "./shop/shop_container";
import SettingsContainer from "./settings/settings-container";


class Options extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "settings"
    };
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
    this.props.clearStats();
  }

  handleClick(e) {
    this.setState({
      selected: e.target.id
    });
    Array.from(document.getElementsByClassName("customize")).forEach(el =>
      el.classList.remove("active")
    );
    e.target.classList.add("active");
  }

  getLinks() {

    const selected = this.state.selected;
    let currentViewPort;

    if (selected === "settings") {
      currentViewPort = <SettingsContainer />;
    } else {
      currentViewPort = <ShopContainer />;
    }


    if (this.props.loggedIn) {
      return (
        <div>
          <div className="greeting-container">
            <div className="greeting">Hello {this.props.user.username} !</div>
            <button className="logout-button" onClick={this.logoutUser}>
              Log Out
            </button>
          </div>
          {currentViewPort}
        </div>
      );
    } else {
      return (
        <div>
          <div className="greeting-container">
            <button className="login-button">Log In</button>
          </div>
          {/* {currentViewPort} */}
          <div className="options-container">
            <div className="customize-panel">
              <div className="customize-title">Customize Your Game</div>
              {/* <div className="currency">${this.props.currency}</div> */}
              <div className="select-customization">
                <div className="customize active" id="settings" onClick={this.handleClick}>
                  Settings
                </div>
                <div className="customize" id="shop" onClick={this.handleClick}>
                  Shop
                </div>
              </div>
              {/* {currentViewPort} */}
            </div>
            <div className="picture-container">
              {/* {rightView}
              {purchaseOption} */}
            </div>
          </div>

          <ShopContainer />
        </div>
      );
    }
  }

  render() {
    return <div>{this.getLinks()}</div>;
  }
};

export default Options;