import React from "react";
import { withRouter } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.signupOrLogin = this.signupOrLogin.bind(this);
  }

  // Once the user has been authenticated, redirect to the Game page
  UNSAFE_componentWillReceiveProps(nextProps) {
    // if (nextProps.currentUser === true) {
    //   this.props.history.push("/game");
    // }

    // Set or clear errors
    this.setState({ errors: nextProps.errors });
  }

  // Handle field updates (called in the render method)
  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();

    let user = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.login(user);
  }

  signupOrLogin(e) {
    Array.from(document.getElementsByClassName('form-container-signup')).forEach(el => el.classList.remove('hidden'));
    Array.from(document.getElementsByClassName('form-container-login')).forEach(el => el.classList.add('hidden'));
  }

  // Render the session errors if there are any
  renderErrors() {
    return (
      <ul>
        {Object.keys(this.state.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.state.errors[error]}</li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className="form-container-login">
        <form onSubmit={this.handleSubmit}>
          <div className="login-form">
            <h1>Login</h1>
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
            <input className="submit-button" type="submit" value="SUBMIT" />
            {this.renderErrors()}
          </div>
        </form>
        <div className="alt-text">
          <div>Create an account?</div>
          <div className="pointer" onClick={this.signupOrLogin}>Sign Up</div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginForm);
