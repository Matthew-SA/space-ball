import React from "react";

class Customize extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  // componentDidMount() {
  //   this.props.fetchCurrency();
  // }

  render() {
    console.log(this.props)
    return (
      <div className="customize-ship-container">
        <div className="customize-panel">
          Customize Ship Box
          <br />
          {this.props.currency}
        </div>
        <div className="ship-picture-container">
          <img src="images/ship-default.png" className="ship" alt="ship" />
        </div>
      </div>
    );
  }
}

export default Customize;
