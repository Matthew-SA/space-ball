import React from "react";

class Settings extends React.Component {

  render() {
    return (
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
    )
  }
}


export default Settings;