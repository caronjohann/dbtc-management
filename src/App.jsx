import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Progress from "./Progress.jsx";
import Log from "./Log.jsx";
import Today from "./Today.jsx";
import Beforemeal from "./Beforemeal.jsx";
import History from "./History.jsx";
import Day from "./Day.jsx";

class UnconnectedApp extends Component {
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
        <Beforemeal />
        {/* <Log /> */}
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
  renderHistory = () => {
    return (
      <div>
        <History />
      </div>
    );
  };
  renderDay = () => {
    return (
      <div>
        <Day
          date={this.props.logDate}
          time={this.props.logTime}
          reading={this.props.logReading}
          food={this.props.logFood}
          insulin={this.props.logInsulin}
        />
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
          <Route exact={true} path="/history" render={this.renderHistory} />
          <Route exact={true} path="/log/:_id" render={this.renderDay} />
          {/* <Route
            exact={true}
            path="/new-entry/before-meal"
            render={this.renderBeforeMeal}
          /> */}
        </div>
      </BrowserRouter>
    );
  };
}

let mapStateToProps = storeState => {
  return {
    logDate: storeState.logDate,
    logTime: storeState.logTime,
    logReading: storeState.logReading,
    logFood: storeState.logFood,
    logInsulin: storeState.logInsulin
  };
};

let App = connect(mapStateToProps)(UnconnectedApp);

export default App;
