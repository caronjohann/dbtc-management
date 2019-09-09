import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { withRouter } from "react-router-dom";

class UnconnectedToday extends Component {
  handleLogClick = each => {
    this.props.dispatch({
      type: "clicked-log",
      date: each.date,
      time: each.time,
      reading: each.reading,
      food: each.foodEntered,
      insulin: each.insulinTaken
    });
  };
  render() {
    let today = moment().format("ll");
    let logsToday = this.props.userLogs.filter(each => {
      return each.date === today;
    });
    return (
      <div>
        <div className="day">Today</div>
        {logsToday.map(each => {
          return (
            <div>
              <Link to={"/log/" + each._id}>
                <div onClick={() => this.handleLogClick(each)} className="log">
                  <div className="time-log">
                    <div className="icon">
                      <img src="assets/ball-icon.png" width="25px" />
                    </div>
                    <div className="time">{each.time}</div>
                  </div>
                  <div className="reading">{each.reading}</div>
                </div>
              </Link>
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

let Today = connect(mapStateToProps)(withRouter(UnconnectedToday));

export default Today;
