import React from "react";

class Ship extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      optionSelection: "Default"
    };
  }
  
  componentDidMount() {
    this.props.toggleSelect();
  }

  render() {
    return (
      <div className="shop-container">
        <div className="ship-select">Choose a Ship Color:</div>
        <div className="ship-options">
          <div className="select-button active" id="Default"
            onClick={this.props.handleSelect}>
            Default
          </div>
          <div className="select-button" id="Red" 
            onClick={this.props.handleSelect}>
            Red
          </div>
          <div className="select-button"  id="Green"
            onClick={this.props.handleSelect}>
            Green
          </div>
          <div className="select-button" id="Blue"
            onClick={this.props.handleSelect}>
            Blue
          </div>
        </div>
      </div>
    );
  }
}

export default Ship;
