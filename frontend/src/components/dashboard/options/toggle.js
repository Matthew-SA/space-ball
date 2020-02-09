import React from "react";
import ShipContainer from "./ship/ship_container";
import BallContainer from "./ball/ball_container";

class Toggle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "ship",
      optionSelection: "Default"
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.leftViewPort = this.leftViewPort.bind(this);
    this.rightViewPort = this.rightViewPort.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.fetchInventory();
    }
  }

  handleClick(e) {
    this.setState({ selected: e.target.id });
    Array.from(document.getElementsByClassName("customize")).forEach(el =>
      el.classList.remove("active")
    );
    e.target.classList.add("active");
  }

  toggleSelect() {
    const state = this.state;
    if (state.selected === "ship") {
      this.setState({ optionSelection: "Default" });
    } else if (state.selected === "ball") {
      this.setState({ optionSelection: "Earth" });
    }
  }

  handleSelect(e) {
    this.setState({
      optionSelection: e.target.id
    });
    Array.from(document.getElementsByClassName("select-button")).forEach(el =>
      el.classList.remove("active")
    );
    e.target.classList.add("active");
  }

  leftViewPort() {
    const selected = this.state.selected;
    if (selected === "ship") {
      return <ShipContainer handleSelect = {this.handleSelect}
        toggleSelect = {this.toggleSelect} />
    } else {
      return <BallContainer handleSelect = {this.handleSelect}
        toggleSelect = {this.toggleSelect} />
    }
  }

  rightViewPort() {
    const optionSelection = this.state.optionSelection;

    if (optionSelection === "Default") {
      return (
        <img src="images/ship-default.png" className="ship" alt="defaultship" />
      );
    } else if (optionSelection === "Red") {
      return <img src="images/ship-red.png" className="ship" alt="redship" />;
    } else if (optionSelection === "Green") {
      return (
        <img src="images/greenship.png" className="ship" alt="greenship" />
      );
    } else if (optionSelection === "Blue") {
      return <img src="images/ship-blue.png" className="ship" alt="blueship" />;
    } else if (optionSelection === "Earth") {
      return <img className="ball" src="images/earth.png" alt="earth" />;
    } else if (optionSelection === "Soccer") {
      return <img className="ball" src="images/soccer_ball.png" alt="soccer" />;
    } else if (optionSelection === "Pizza") {
      return <img className="ball" src="images/pizza.png" alt="pizza" />;
    } else if (optionSelection === "Moon") {
      return <img className="ball" src="images/moon.png" alt="moon" />;
    }
  }

  purchaseOption() {
    const optionSelection = this.state.optionSelection;

    if (optionSelection === "Default" || optionSelection === "Earth") {
      return (
        <div className="purchase-container">
          <div className="price">Not For Sale</div>
          <div className="default-button">Default</div>
          {/* <div className="default-button" onClick={this.doMoney}>
            MONEY
          </div> */}
        </div>
      );
    } else if (
      this.props.inventory.ships.includes(optionSelection) ||
      this.props.inventory.balls.includes(optionSelection)
    ) {
      return (
        <div className="purchase-container">
          <div className="price">$500</div>
          <div className="sell-button">SELL</div>
        </div>
      );
    } else {
      return (
        <div className="purchase-container">
          <div className="price">$500</div>
          <div className="buy-button" onClick={this.buyShip}>
            BUY
          </div>
          {/* <div className="default-button" onClick={this.doMoney}>
            MONEY
          </div> */}
        </div>
      );
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="options-container">
        <div className="customize-panel">
          <div className="customize-title">Game Options</div>
          <div className="select-customization">
            <div className="customize active" id="ship"
              onClick={this.handleClick}>
              Ship
            </div>
            <div className="customize" id="ball"
              onClick={this.handleClick}>
              Ball
            </div>
          </div>
          <div>{this.leftViewPort()}</div>
        </div>
        <div className="picture-container">
          {this.rightViewPort()}
          {this.purchaseOption()}
        </div>
      </div>
    );
  }
}

export default Toggle;
