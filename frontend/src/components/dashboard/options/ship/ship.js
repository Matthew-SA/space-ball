import React from "react";

class Ship extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      optionSelection: "Default"
    };

    this.handleSelectChild = this.handleSelectChild.bind(this);
    this.selectShip = this.selectShip.bind(this);
  }
  
  componentDidMount() {
    this.props.toggleSelect();
  }

  selectShip() {
    // const setShip = new Promise((resolve, reject) => {
    //   resolve(this.props.selectShip(this.state.optionSelection));
    // })
    // setShip.then(() => {
    //   this.props.fetchInventory();
    // })
    this.props.selectShip(this.state.optionSelection);
    setTimeout(() => {
      this.props.fetchInventory();
    }, 100);
  }

  handleSelectChild(e) {
    this.props.handleSelect(e);
    this.setState({
      optionSelection: e.target.id
    })
  }

  display() {
    const optionSelection = this.state.optionSelection;
    const gameoptions = this.props.inventory.gameoptions;
    const ships = this.props.inventory.ships;

    if (gameoptions.includes(optionSelection)) {
      return (
        <div className="ship-selected-message">SELECTED</div>
      )
    } else if (ships.includes(optionSelection)) {
      return (
        <div className="select-ship" 
        onClick={this.selectShip}>SELECT THIS SHIP</div>
      )
    } else {
      return (
        <div>
          <div className="unavailable">ACQUIRE SHIP TO USE</div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="shop-container">
        <div className="currency">${this.props.inventory.currency}</div>
        <div className="ship-select">Choose a Ship Color:</div>
        <div className="ship-options">
          <div className="select-button active" id="Default"
            onClick={this.handleSelectChild}>
            Default
          </div>
          <div className="select-button" id="Red" 
            onClick={this.handleSelectChild}>
            Red
          </div>
          <div className="select-button"  id="Green"
            onClick={this.handleSelectChild}>
            Green
          </div>
          <div className="select-button" id="Blue"
            onClick={this.handleSelectChild}>
            Blue
          </div>
        </div>
        {/* <div className="slider">
          <div className="slides">
            <div id="slide-1">1</div>
            <div id="slide-2">2</div>
            <div id="slide-3">3</div>
            <div id="slide-4">4</div>
          </div>
        </div> */}
        {this.display()}
      </div>
    );
  }
}

export default Ship;