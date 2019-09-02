import React, { Component } from "react";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      password: "",
      passwordCheck: "",
      registered: null
    };
  }

  handleSubmit = async evt => {
    evt.preventDefault();
    console.log("signup form submitted");
    if (this.state.password !== this.state.passwordCheck) {
      this.setState({ registered: "wrongPassword" });
      return;
    }
    let data = new FormData();
    data.append("fullName", this.state.fullName);
    data.append("email", this.state.email);
    data.append("password", this.state.password);
    let response = await fetch("/signup", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      this.setState({ registered: false });
    } else {
      this.setState({ registered: true });
    }
  };

  handleFullName = evt => {
    this.setState({ fullName: evt.target.value });
  };

  handleEmail = evt => {
    this.setState({ email: evt.target.value });
  };

  handlePass = evt => {
    this.setState({ password: evt.target.value });
  };

  handlePassCheck = evt => {
    this.setState({ passwordCheck: evt.target.value });
  };

  render = () => {
    if (this.state.registered === "wrongPassword") {
      return (
        <div>
          <h2>Passwords do match, please try again</h2>
        </div>
      );
    }
    if (this.state.registered === false) {
      return (
        <div>
          <h2>Email already exists, please login or use a different one</h2>
        </div>
      );
    }
    if (this.state.registered === true) {
      return (
        <div>
          <h2>Signup Successful</h2>
        </div>
      );
    }
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Please enter your full name</h2>
          <input
            type="text"
            placeholder="Enter your name here"
            onChange={this.handleFullName}
          />
          <h2>Now please enter your email</h2>
          <input
            type="email"
            placeholder="Enter your email here"
            onChange={this.handleEmail}
          />
          <h2>Choose a secure password</h2>
          <input
            type="password"
            placeholder="Enter a password here"
            onChange={this.handlePass}
          />
          <h2>For security please enter your password again</h2>
          <input
            type="password"
            placeholder="Enter password again here"
            onChange={this.handlePassCheck}
          />
          <input type="submit" value="Signup" />
        </form>
      </div>
    );
  };
}

export default Signup;
