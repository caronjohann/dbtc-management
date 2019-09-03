import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Progress from "./Progress.jsx";
import Log from "./Log.jsx";
import Today from "./Today.jsx";
import Beforemeal from "./Beforemeal.jsx";

class App extends Component {
  renderHomepage = () => {
    return (
      <div>
        {/* <Progress /> */}
        {/* <Log />
        <Signup /> */}

        <Login />
      </div>
    );
  };
  renderDashboard = () => {
    return (
      <div>
        <Progress />
      </div>
    );
  };

  renderLog = () => {
    return (
      <div>
        <Log />
      </div>
    );
  };
  renderBeforeMeal = () => {
    return (
      <div>
        <Beforemeal />
      </div>
    );
  };

  renderSignup = () => {
    return (
      <div>
        <Signup />
      </div>
    );
  };

  render = () => {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" render={this.renderHomepage} />
          <Route exact={true} path="/dashboard" render={this.renderDashboard} />
          <Route exact={true} path="/signup" render={this.renderSignup} />
          <Route exact={true} path="/new-entry" render={this.renderLog} />
          <Route
            exact={true}
            path="/new-entry/before-meal"
            render={this.renderBeforeMeal}
          />
        </div>
      </BrowserRouter>
    );
  };
}

export default App;
