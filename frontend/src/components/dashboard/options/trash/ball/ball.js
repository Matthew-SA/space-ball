import React from "react";

class Ball extends React.Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //   };
  // }

  render() {
    return(
      <div className="options-container">
        <div className="customize-panel">
          <div className="customize-title">Game Options</div>
          <div className="select-customization">
            <div
              className="customize active"
              id="ship"
              onClick={this.handleClick}
            >
              Ship
            </div>
            <div className="customize" id="ball" onClick={this.handleClick}>
              Ball
            </div>
          </div>
          <div>BALL Stuff Carousel</div>
        </div>
        <div>BALL Stuff selection</div>
      </div>
    );
  }
}

export default Ball;
