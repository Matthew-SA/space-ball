import React from "react";

class Customize extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: "myship" }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({
      selected: e.target.id
    });
    Array.from(document.getElementsByClassName('customize')).forEach(el => el.classList.remove('active'));
    e.target.classList.add('active');
  }


  render() {
    console.log("props", this.props)

    const selected = this.state.selected;
    let currentViewPort;
    let rightView;

    if (selected === "myship") {
      rightView = <img src="images/ship-default.png" className="ship" alt="ship" />
      currentViewPort = <div>SHIPS</div>
    } else if (selected === "myball") {
      rightView = <img className="ball" src="images/soccer_ball.png" alt="ball" />
      currentViewPort = <div>BALLS</div>
    }

    

    return (
      <div className="customize-ship-container">
        <div className="customize-panel">
          <div className="customize-title">Customization Options</div>
          <div className="currency">${this.props.currency}</div>
          <div className="select-customization">
            <div className="customize active" id="myship" onClick={this.handleClick}>My Ship</div>
            <div className="customize" id="myball" onClick={this.handleClick}>My Ball</div>
          </div>
          <div>
            {currentViewPort}
          </div>
        </div>
        <div className="picture-container">
          {rightView}
        </div>
      </div>
    );
  }
}

export default Customize;
