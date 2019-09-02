import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Today from "./Today.jsx";

class UnconnectedProgress extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      percentage: undefined,
      filter: "today"
    };
  }
  componentDidMount = async () => {
    let response = await fetch("/progress");
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    this.props.dispatch({
      type: "user-logs",
      userLogs: body
    });
    this.setState({
      loaded: true
    });

    let today = moment().format("ll");

    let allReadingsToday = this.props.userLogs.filter(each => {
      return each.date === today;
    });

    let inRangeToday = allReadingsToday.filter(each => {
      return each.reading >= 4.0 && each.reading <= 9.8;
    });

    let percentageToday = (inRangeToday.length / allReadingsToday.length) * 100;
    this.setState({ percentage: Math.floor(percentageToday) });
  };

  handleDay = () => {
    let today = moment().format("ll");

    let allReadingsToday = this.props.userLogs.filter(each => {
      return each.date === today;
    });

    let inRangeToday = allReadingsToday.filter(each => {
      return each.reading >= 4.0 && each.reading <= 9.8;
    });

    let percentageToday = (inRangeToday.length / allReadingsToday.length) * 100;
    this.setState({ percentage: Math.floor(percentageToday), filter: "today" });
  };

  handleMonth = () => {
    let lastMonth = [];
    for (let i = 0; i < 30; i++) {
      let day = moment()
        .subtract(i, "days")
        .format("ll");
      lastMonth = lastMonth.concat(day);
    }

    let allReadingsThisMonth = [];

    this.props.userLogs.forEach(each => {
      for (var i = 0; i < lastMonth.length; i++) {
        if (lastMonth[i] === each.date) {
          allReadingsThisMonth = allReadingsThisMonth.concat(each);
        }
      }
    });

    let inRangeThisMonth = allReadingsThisMonth.filter(each => {
      return each.reading >= 4.0 && each.reading <= 9.8;
    });

    let percentageThisMonth =
      (inRangeThisMonth.length / allReadingsThisMonth.length) * 100;
    this.setState({
      percentage: Math.floor(percentageThisMonth),
      filter: "the last month"
    });
  };

  handleWeek = () => {
    let lastWeek = [];
    for (let i = 0; i < 7; i++) {
      let day = moment()
        .subtract(i, "days")
        .format("ll");
      lastWeek = lastWeek.concat(day);
    }

    let allReadingsThisWeek = [];

    this.props.userLogs.forEach(each => {
      for (var i = 0; i < lastWeek.length; i++) {
        if (lastWeek[i] === each.date) {
          allReadingsThisWeek = allReadingsThisWeek.concat(each);
        }
      }
    });

    let inRangeThisWeek = allReadingsThisWeek.filter(each => {
      return each.reading >= 4.0 && each.reading <= 9.8;
    });

    let percentageThisWeek =
      (inRangeThisWeek.length / allReadingsThisWeek.length) * 100;
    this.setState({
      percentage: Math.floor(percentageThisWeek),
      filter: "the last week"
    });
  };

  handleThreeMonths = () => {
    let last3Months = [];
    for (let i = 0; i < 7; i++) {
      let day = moment()
        .subtract(i, "days")
        .format("ll");
      last3Months = last3Months.concat(day);
    }

    let allReadingsThis3Months = [];

    this.props.userLogs.forEach(each => {
      for (var i = 0; i < last3Months.length; i++) {
        if (last3Months[i] === each.date) {
          allReadingsThis3Months = allReadingsThis3Months.concat(each);
        }
      }
    });

    let inRangeThis3Months = allReadingsThis3Months.filter(each => {
      return each.reading >= 4.0 && each.reading <= 9.8;
    });

    let percentageThis3Months =
      (inRangeThis3Months.length / allReadingsThis3Months.length) * 100;
    this.setState({
      percentage: Math.floor(percentageThis3Months),
      filter: "the last 3 months"
    });
  };
  render = () => {
    // 1. calculate the percentage in range
    // 2. take the number of all your readings over the course of 1 day, 1 week, 2 months and 3 months
    // 3. out of all the total readings check how many are between 4.0 and 9.8
    // 3. take that number of good readings and divide it by the total number of all readings in your range and * it by 100 to get the percentage in range
    // 4. so, for example if you had 5 readings in 1 day which were 15.2, 12.1, 9.8, 4.2, 16.0 two readings are in range (9.8 and 4.2) take 2 and divide by total of 5 readings * 100 = 40% in range for the day
    if (!this.state.loaded) {
      return <div>Loading</div>;
    }

    // console.log("user logs", this.props.userLogs);

    // console.log("readings this week", allReadingsThisWeek);

    return (
      <div>
        <div>{this.state.percentage}</div>
        <div>
          During {this.state.filter} you have been in range{" "}
          {this.state.percentage}% of the time
        </div>
        <button onClick={this.handleDay}>Today</button>
        <button onClick={this.handleWeek}>Week</button>
        <button onClick={this.handleMonth}>Month</button>
        <button onClick={this.handleThreeMonths}>3 Months</button>
        <Today />
      </div>
    );
  };
}

let mapStateToProps = storeState => ({
  userLogs: storeState.userLogs
});

let Progress = connect(mapStateToProps)(UnconnectedProgress);

export default Progress;
