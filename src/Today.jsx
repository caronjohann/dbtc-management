import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

class UnconnectedToday extends Component {
  render() {
    let today = moment().format("ll");
    let logsToday = this.props.userLogs.filter(each => {
      return each.date === today;
    });
    return (
      <div>
        <div>Today</div>
        {logsToday.map(each => {
          return (
            <div>
              <div>{each.time}</div>
              <div>{each.reading}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

let mapStateToProps = storeState => ({
  userLogs: storeState.userLogs
});

let Today = connect(mapStateToProps)(UnconnectedToday);

export default Today;
