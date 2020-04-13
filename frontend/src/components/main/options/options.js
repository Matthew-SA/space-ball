import React from "react";
import ShipContainer from "./ship/ship_container";
import BallContainer from "./ball/ball_container";
import NavBarContainer from "../navbar/navbar_container";

class Options extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "ship",
      optionSelection: "Default"
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.leftViewPort = this.leftViewPort.bind(this);
    this.rightViewPort = this.rightViewPort.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.buyShip = this.buyShip.bind(this);
    this.buyBall = this.buyBall.bind(this);
    this.sellShip = this.sellShip.bind(this);
    this.sellBall = this.sellBall.bind(this);
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

  buyShip() {
    const buy = new Promise((resolve, reject) => {
      resolve(this.props.addShip(this.state.optionSelection))
    })

    if (this.props.inventory.currency - 500 >= 0) {
      buy.then(() => {
        this.props.changeCurrency(-500)
      })
        .then(() => {
          setTimeout(() => {
            this.props.fetchInventory();
          }, 50);
        })
    } else {
      alert("NOT ENOUGH MONEY! Play more, earn more.")
    }
  }

  buyBall() {
    const buy = new Promise((resolve, reject) => {
      resolve(this.props.addBall(this.state.optionSelection))
    })
    if (this.props.inventory.currency - 500 >= 0) {
      buy.then(() => {
        this.props.changeCurrency(-500)
      })
        .then(() => {
          setTimeout(() => {
            this.props.fetchInventory();
          }, 50);
        })
    } else {
      alert("NOT ENOUGH MONEY! Play more, earn more.")
    }
  }

  sellShip() {
    this.props.removeShip(this.state.optionSelection)
    this.props.selectShip("Default")
    setTimeout(() => {
      this.props.changeCurrency(500)
    }, 50);
    setTimeout(() => {
      this.props.fetchInventory();
    }, 100);
  }

  sellBall() {
    this.props.removeBall(this.state.optionSelection)
    this.props.selectBall("Earth")
    setTimeout(() => {
      this.props.changeCurrency(500)
    }, 50);
    setTimeout(() => {
      this.props.fetchInventory();
    }, 100);
  }

  leftViewPort() {
    const selected = this.state.selected;
    if (selected === "ship") {
      return <ShipContainer handleSelect={this.handleSelect}
        toggleSelect={this.toggleSelect} />
    } else {
      return <BallContainer handleSelect={this.handleSelect}
        toggleSelect={this.toggleSelect} />
    }
  }

  rightViewPort() {
    const optionSelection = this.state.optionSelection;

    if (optionSelection === "Default") {
      return (
        <img src="images/default_ship_full.png" className="ship" alt="defaultship" />
      );
    } else if (optionSelection === "Red") {
      return <img src="images/red_ship_full.png" className="ship" alt="redship" />;
    } else if (optionSelection === "Green") {
      return (
        <img src="images/green_ship_full.png" className="ship" alt="greenship" />
      );
    } else if (optionSelection === "Blue") {
      return <img src="images/blue_ship_full.png" className="ship" alt="blueship" />;
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
    const selected = this.state.selected;

    if (!this.props.loggedIn) {
      if (optionSelection === "Default" || optionSelection === "Earth") {
        return (
          <div className="purchase-container">
            <div className="price">Not For Sale</div>
            <div className="default-button">Default</div>
          </div>
        );
      } else {
        if (this.props.inventory.currency - 500 >= 0) {
          return (
            <div className="purchase-container">
              <div className="price">$500</div>
              <div className="buy-button" id="buy" onClick={this.buyBall}>
                BUY
              </div>
            </div>
          )
          } else {
          return (
            <div className="purchase-container">
              <div className="price">$500</div>
              <div className="default-button nofunds">
                Insufficient Funds
              </div>
            </div>
          )
        }
      }
    } else {
      if (optionSelection === "Default" || optionSelection === "Earth") {
        return (
          <div className="purchase-container">
            <div className="price">Not For Sale</div>
            <div className="default-button">Default</div>
          </div>
        )
      } else if (
        this.props.inventory.ships.includes(optionSelection) ||
        this.props.inventory.balls.includes(optionSelection)
      ) {
        if (selected === "ship") {
          return (
            <div className="purchase-container">
              <div className="price">$500</div>
              <div className="sell-button" onClick={this.sellShip}>SELL</div>
            </div>
          );
        } else {
          return (
            <div className="purchase-container">
              <div className="price">$500</div>
              <div className="sell-button" onClick={this.sellBall}>SELL</div>
            </div>
          )
        }
      } else {
        if (selected === "ship") {
          return (
            <div className="purchase-container">
              <div className="price">$500</div>
              <div className="buy-button" onClick={this.buyShip}>
                BUY
              </div>
            </div>
          );
        } else {
          return (
            <div className="purchase-container">
              <div className="price">$500</div>
              <div className="buy-button" onClick={this.buyBall}>
                BUY
              </div>
            </div>
          );
        }
      }
    }
  }

  render() {
    return (
      <div className="mainpage-container">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
        <NavBarContainer />
        <div className="options-container">
          <div className="box customize-panel">
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
            <div className="shop-container">{this.leftViewPort()}</div>
          </div>
          <div className="picture-container">
            {this.rightViewPort()}
            {this.purchaseOption()}
          </div>
        </div>
      </div>
    );
  }
};

export default Options;