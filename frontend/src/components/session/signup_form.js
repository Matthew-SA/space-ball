import React from "react";
import { withRouter, Link } from "react-router-dom";
import NavBarContainer from "../main/navbar/navbar_container";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      password2: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
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
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user, this.props.history);
    this.props.createStat(user);
    this.props.createInventory(user);
  }

  // signupOrLogin() {
  //   Array.from(
  //     document.getElementsByClassName("form-container-login")
  //   ).forEach(el => el.classList.remove("hidden"));
  //   Array.from(
  //     document.getElementsByClassName("form-container-signup")
  //   ).forEach(el => el.classList.add("hidden"));
  //   this.props.clearErrors();
  // }

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
        <div className="box form-container-signup">
          <div className="title">Sign Up for a New Account</div>
          <form onSubmit={this.handleSubmit}>
            <div className="signup-form">
              <input
                className="input-field"
                type="text"
                value={this.state.email}
                onChange={this.update("email")}
                placeholder="Email"
              />
              <br />
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
              <input
                className="input-field"
                type="password"
                value={this.state.password2}
                onChange={this.update("password2")}
                placeholder="Confirm Password"
              />
              <br />
              <input className="submit-button" type="submit" value="SIGN UP" />
              {this.renderErrors()}
            </div>
          </form>
          <Link to="/login">
            <div className="alt-text">
              <div>Already have an account?</div>
              <div className="link">Login</div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(SignupForm);
