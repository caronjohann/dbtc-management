import React, { Component } from "react";
import { Link } from "react-router-dom";
import Progress from "./Progress.jsx";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loggedIn: null
    };
  }
  handleSubmit = async evt => {
    evt.preventDefault();
    console.log("login form submitted");
    let formData = new FormData();
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);
    let response = await fetch("/login", {
      method: "POST",
      body: formData,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      this.setState({ loggedIn: false });
    } else {
      this.setState({ loggedIn: true });
    }
    return (
      <div>
        <Progress />
      </div>
    );
  };
  handleEmail = evt => {
    this.setState({ email: evt.target.value });
  };
  handlePassword = evt => {
    this.setState({ password: evt.target.value });
  };
  render = () => {
    if (this.state.loggedIn === true) {
      return (
        <div>
          <h2>You have logged in, welcome</h2>
          <Link to="/dashboard">Progress</Link>
          <Link to="/new-entry">New Log</Link>
        </div>
      );
    }
    return (
      <div className="container log-cont">
        <div className="globe">
          <img src="assets/globe.gif" width="350px"></img>
        </div>
        <div className="form-content">
          <form>
            <h2 className="login-headings">Email</h2>
            <input
              type="email"
              onChange={this.handleEmail}
              placeholder="you@domain.com"
            />
            <h2 className="login-headings">Password</h2>
            <input
              type="password"
              onChange={this.handlePassword}
              placeholder="••••••"
            />

            <div>
              <a onClick={this.handleSubmit} className="login-btn">
                Login
              </a>
            </div>
          </form>
          <div className="create-acnt-link">
            <Link to="/signup">Create an account</Link>
          </div>
        </div>
      </div>
    );
  };
}

export default Login;
