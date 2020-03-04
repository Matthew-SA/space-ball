import React from "react";
import { withRouter, Link } from "react-router-dom";
import NavBarContainer from "../main/navbar/navbar_container";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let user = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.login(user);

  }

  // signupOrLogin() {
  //   Array.from(
  //     document.getElementsByClassName("form-container-signup")
  //   ).forEach(el => el.classList.remove("hidden"));
  //   Array.from(
  //     document.getElementsByClassName("form-container-login")
  //   ).forEach(el => el.classList.add("hidden"));
  //   this.props.clearErrors();
  // }

  demo(user) {
    const intervalSpeed = 70;
    const { username, password } = user;
    const demoUsernameTime = username.length * intervalSpeed;
    const demoPasswordTime = password.length * intervalSpeed;
    const buffer = intervalSpeed * 2;
    const totalDemoTime = demoUsernameTime + demoPasswordTime + buffer;
    this.demoUsername(username, intervalSpeed);
    this.update("username")
    setTimeout(() => this.demoPassword(password, intervalSpeed), demoUsernameTime);
    this.update("password")
    setTimeout(() => this.props.login(user), totalDemoTime + 200)
  }

  demoUsername(username, intervalSpeed) {
    let i = 0;
    setInterval(() => {
      if (i <= username.length) {
        this.setState({ username: username.slice(0, i) });
        i++;
      } else {
        clearInterval();
      }
    }, intervalSpeed);
  }

  demoPassword(password, intervalSpeed) {
    let j = 0;
    setInterval(() => {
      if (j <= password.length) {
        this.setState({ password: password.slice(0, j) });
        j++;
      } else {
        clearInterval();
      }
    }, intervalSpeed);
  }

  handleDemo(e) {
    e.preventDefault();
    const user = Object.assign({}, { username: 'DemoUser', password: 'demodemo' });
    this.demo(user);
  }


  // Render the session errors if there are any
  renderErrors() {
    return (
      <ul className="errors">
        {Object.keys(this.props.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.props.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="mainpage-container">
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
        <NavBarContainer />
        <div className="form-container-login">
          <div className="title">Log In to Your Account</div>
          <form onSubmit={this.handleSubmit}>
            <div className="login-form">
              <input
                className="input-field"
                type="text"
                value={this.state.username}
                onChange={this.update("username")}
                placeholder="Username"
              />
              <br />
              <input
                className="input-field"
                type="password"
                value={this.state.password}
                onChange={this.update("password")}
                placeholder="Password"
              />
              <br />
              <input className="submit-button" type="submit" value="LOG IN" />
              <br />
              <button
                className="demo-login-button"
                onClick={this.handleDemo}
                type="button"
              >
                DEMO LOG IN
              </button>
              {this.renderErrors()}
            </div>
          </form>
          <Link to="signup">
            <div className="alt-text">
              <div>Create an account?</div>
              <div className="link">Sign Up</div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);
