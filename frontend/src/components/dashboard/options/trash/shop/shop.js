import React from "react";

class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      selected: "mySettings",
      optionSelection: "Default"
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.buyShip = this.buyShip.bind(this);
    this.doMoney = this.doMoney.bind(this);
  }

  componentDidMount(){
    this.props.fetchInventory();
  }
  
  handleClick(e) {
    this.setState({
      selected: e.target.id,
      optionSelection: "Default"
    });
    Array.from(document.getElementsByClassName('customize')).forEach(el => el.classList.remove('active'));
    e.target.classList.add('active');
  }

  handleSelect(e) {
    this.setState({
      optionSelection: e.target.id
    });
    Array.from(document.getElementsByClassName('select-button')).forEach(el => el.classList.remove('active'));
    e.target.classList.add('active');
  }

  buyShip() {
    const buy = new Promise((resolve, reject) => {
      resolve(this.props.addShip(this.state.optionSelection));
    })
    buy.then(() => {
      this.props.fetchInventory();
    })
  }
  
  doMoney() {
    this.props.changeCurrency(-500);
  }

  render() {
    const selected = this.state.selected;
    const optionSelection = this.state.optionSelection;
    let currentViewPort;
    let rightView;
    let purchaseOption;

    if (selected === "shop") {
      
      currentViewPort = 
        <div className="shop-container">
          <div className="ship-select">Choose a Ship Color:</div>
          <div className="ship-options">
            <div className="select-button active" id="Default" onClick={this.handleSelect}>Default</div>
            <div className="select-button" id="Red" onClick={this.handleSelect}>Red</div>
            <div className="select-button" id="Green" onClick={this.handleSelect}>Green</div>
            <div className="select-button" id="Blue" onClick={this.handleSelect}>Blue</div>
          </div>
          <div className="ball-select">Choose a Ball Type:</div>
          <div className="ball-options">
            <div className="select-button" id="Earth" onClick={this.handleSelect}>Earth</div>
            <div className="select-button" id="Soccer" onClick={this.handleSelect}>Soccer</div>
            <div className="select-button" id="Pizza" onClick={this.handleSelect}>Pizza</div>
            <div className="select-button" id="Moon" onClick={this.handleSelect}>Moon</div>
          </div>
        </div>
      if (optionSelection === "Default") {
        rightView = <img src="images/ship-default.png" className="ship" alt="defaultship" />
      } else if (optionSelection === "Red") {
        rightView = <img src="images/ship-red.png" className="ship" alt="redship" />
      } else if (optionSelection === "Green") {
        rightView = <img src="images/greenship.png" className="ship" alt="greenship" />
      } else if (optionSelection === "Blue") {
        rightView = <img src="images/ship-blue.png" className="ship" alt="blueship" />
      } else if (optionSelection === "Earth") {
        rightView = <img className="ball" src="images/earth.png" alt="earth" />
      } else if (optionSelection === "Soccer") {
        rightView = <img className="ball" src="images/soccer_ball.png" alt="soccer" />
      } else if (optionSelection === "Pizza") {
        rightView = <img className="ball" src="images/pizza.png" alt="pizza" />
      } else if (optionSelection === "Moon") {
        rightView = <img className="ball" src="images/moon.png" alt="moon" />
      }
    } else if (selected === "mySettings") {
      // console.log(this.props)
      currentViewPort = 
        <div className="settings-container">
          
        </div>
    }

    if (this.state.selected === "shop") {
      if (optionSelection === "Default" || optionSelection === "Earth") {
        purchaseOption =
          <div>
            <div className="price">Not For Sale</div>
            <div className="default-button">Default</div>
            <div className="default-button" onClick={this.doMoney}>MONEY</div>
          </div>
      } else if (this.props.inventory.ships.includes(optionSelection) 
        || (this.props.inventory.balls.includes(optionSelection))) {
        purchaseOption = 
          <div>
            <div className="price">$500</div>
            <div className="sell-button">SELL</div>
          </div>
      } else {
        purchaseOption = 
          <div>
            <div className="price">$500</div>
            <div className="buy-button" onClick={this.buyShip}>BUY</div>
            <div className="default-button" onClick={this.doMoney}>MONEY</div>
          </div>
      }
    } else {
      purchaseOption = null
    }

    return (
      <div className="options-container">
        <div className="customize-panel">
          <div className="customize-title">Customize Your Game</div>
          {/* <div className="currency">${this.props.currency}</div> */}
          <div className="select-customization">
            <div className="customize active" id="mySettings" onClick={this.handleClick}>My Settings</div>
            <div className="customize" id="shop" onClick={this.handleClick}>Shop</div>
          </div>
          {currentViewPort}
        </div>
        <div className="picture-container">
          {rightView}
          {purchaseOption}
        </div>
      </div>
    );
  }
}

export default Shop;
