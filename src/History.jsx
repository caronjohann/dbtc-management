import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

class UnconnectedHistory extends Component {
  render() {
    let today = moment().format("ll");
    let logsToday = this.props.userLogs.filter(each => {
      return each.date === today;
    });
    return <div></div>;
    // return (
    //   <div>
    //     <div className="day">Today</div>
    //     {logsToday.map(each => {
    //       return (
    //         <div className="log">
    //           <div className="time-log">
    //             <div className="icon">
    //               <img src="assets/log-icon.png" width="20px" />
    //             </div>
    //             <div className="time">{each.time}</div>
    //           </div>
    //           <div className="reading">{each.reading}</div>
    //         </div>
    //       );
    //     })}
    //   </div>
    // );
  }
}

let mapStateToProps = storeState => ({
  userLogs: storeState.userLogs
});

let History = connect(mapStateToProps)(UnconnectedHistory);

export default History;
