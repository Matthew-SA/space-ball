import React from "react";

class Ball extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      optionSelection: "Earth"
    };
  }

  componentDidMount() {
    this.props.toggleSelect();
  }

  render() {
    console.log("ballmounted")
    return (
      <div className="shop-container">
        <div className="ball-select">Choose a Ball Type:</div>
        <div className="ball-options">
          <div className="select-button active" id="Earth" onClick={this.props.handleSelect}>Earth</div>
          <div className="select-button" id="Soccer" onClick={this.props.handleSelect}>Soccer</div>
          <div className="select-button" id="Pizza" onClick={this.props.handleSelect}>Pizza</div>
          <div className="select-button" id="Moon" onClick={this.props.handleSelect}>Moon</div>
        </div>
      </div>
    );
  }
}

export default Ball;
