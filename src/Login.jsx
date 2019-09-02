import React, { Component } from "react";
import { Link } from "react-router-dom";

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
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Email address</h2>
          <input type="email" onChange={this.handleEmail} />
          <h2>Password</h2>
          <input type="password" onChange={this.handlePassword} />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  };
}

export default Login;
