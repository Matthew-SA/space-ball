import React from "react";

class Ball extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      optionSelection: "Earth"
    };

    this.handleSelectChild = this.handleSelectChild.bind(this);
    this.selectBall = this.selectBall.bind(this);
  }

  componentDidMount() {
    this.props.toggleSelect();
  }

  selectBall() {
    const sel = new Promise((resolve, reject) => {
      resolve(this.props.selectBall(this.state.optionSelection))
    })
    sel.then(() => {
      setTimeout(() => {
        this.props.fetchInventory();
      }, 100);
    })
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
    const balls = this.props.inventory.balls;

    if (gameoptions.ball.includes(optionSelection)) {
      return (
        <div className="ball-selected-message">SELECTED</div>
      )
    } else if (balls.includes(optionSelection)) {
      return (
        <div className="select-ball"
          onClick={this.selectBall}>SELECT THIS BALL</div>
      )
    } else {
      return (
        <div>
          <div className="unavailable">BALL NOT IN INVENTORY</div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="shop-container">
        <div className="currency">My Funds: ${this.props.inventory.currency}</div>
        <div className="title">Choose a Ball Type</div>
        <div className="ball-options">
          <div className="select-button active" id="Earth" onClick={this.handleSelectChild}>Earth</div>
          <div className="select-button" id="Soccer" onClick={this.handleSelectChild}>Soccer</div>
          <div className="select-button" id="Pizza" onClick={this.handleSelectChild}>Pizza</div>
          <div className="select-button" id="Moon" onClick={this.handleSelectChild}>Moon</div>
        </div>
        {this.display()}
      </div>
    );
  }
}

export default Ball;
