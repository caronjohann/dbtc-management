import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

class UnconnectedYesterday extends Component {
  render() {
    let yesterday = moment()
      .subtract(1, "days")
      .format("ll");
    let logsToday = this.props.userLogs.filter(each => {
      return each.date === yesterday;
    });
    return (
      <div>
        <div className="day">Yesterday</div>
        {logsToday.map(each => {
          return (
            <div className="log">
              <div className="time-log">
                <div className="icon">
                  <img src="assets/ball-icon.png" width="20px" />
                </div>
                <div className="time">{each.time}</div>
              </div>
              <div className="reading">{each.reading}</div>
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

let Yesterday = connect(mapStateToProps)(UnconnectedYesterday);

export default Yesterday;
