import React from "react";

class Customize extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      selected: "shop",
      optionSelection: "Default"
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
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
      console.log(this.props)
      currentViewPort = 
        <div className="settings-container">
          
        </div>
    }

    if (this.state.selected === "shop") {
      if (this.props.ships.includes(optionSelection) || (this.props.balls.includes(optionSelection))) {
        purchaseOption = 
          <div className="purchased">PURCHASED</div>
      } else {
        purchaseOption = 
          <div className="buy-button">BUY NOW</div>
      }
    } else {
      purchaseOption = null
    }

    return (
      <div className="options-container">
        <div className="customize-panel">
          <div className="customize-title">Customization Options</div>
          <div className="currency">${this.props.currency}</div>
          <div className="select-customization">
            <div className="customize active" id="shop" onClick={this.handleClick}>Shop</div>
            <div className="customize" id="mySettings" onClick={this.handleClick}>My Settings</div>
          </div>
          <div>
            {currentViewPort}
          </div>
        </div>
        <div className="picture-container">
          {rightView}
          {purchaseOption}
        </div>
      </div>
    );
  }
}

export default Customize;
