import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

class UnconnectedDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      afterMeal: false,
      afterReading: "",
      readingAdded: false
    };
  }
  handleAfterMeal = () => {
    this.setState({ afterMeal: !this.state.afterMeal });
  };
  handleAfterMealReading = evt => {
    this.setState({ afterReading: evt.target.value });
  };
  handleAddAfterMeal = () => {
    this.setState({
      readingAdded: true,
      afterMeal: !this.state.afterMeal
    });
  };

  render = () => {
    let totalCarbs = 0;
    let currentTime = moment().format("LT");

    if (this.state.afterMeal) {
      return (
        <div className="entry-cont">
          <div className="reading-container">
            <div className="input-pos">
              {/* <div>
            <img src="assets/meter-icon.png" width="100px"></img>
          </div> */}
              <div className="circle">
                <div class="card">
                  <div class="card__face card__face--front"></div>
                  <div class="card__face card__face--back"></div>
                </div>
              </div>
              <div className="log-heading">
                <h2>After-meal Reading</h2>
              </div>
              <div className="log-desc">
                Enter your blood sugar reading 1.5 hours after eating
              </div>
              <div className="reading">
                <input type="number" onChange={this.handleAfterMealReading} />
              </div>
            </div>
            <div className="continue-btn" onClick={this.handleAddAfterMeal}>
              Click to add reading
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="day-cont">
          <div className="meter-cont">
            <div>
              <img src="/assets/globe.gif" width="150px"></img>
            </div>
            <div className="top-time">{this.props.date}</div>
            <div className="reading-segment">
              <div className="number">{this.props.reading}</div>
              <div className="details">
                <div className="meter-heading">Before-meal reading</div>
                <div className="meter-heading">{this.props.time}</div>
              </div>
            </div>
            {this.props.food.forEach(each => {
              totalCarbs = each.netCarbs * each.foodQuantity + totalCarbs;
            })}
            <div className="reading-segment">
              <div className="number">
                <div className="food-list">Food List</div>
              </div>
              <div className="details">
                <div className="meter-heading">Logged Carbs: {totalCarbs}g</div>
                <div className="meter-heading">{this.props.time}</div>{" "}
              </div>
            </div>
            {/* {this.props.food.map(each => {
            return (
              <div>
                <div>{each.foodLabel}</div>
                <div>{each.foodQuantity}</div>
                <div>{each.quantityLabel}</div>
              </div>
            );
          })} */}
            <div className="reading-segment">
              <div className="number">{this.props.insulin}</div>
              <div className="details">
                <div className="meter-heading">Units of Insulin Taken</div>
                <div className="meter-heading">{this.props.time}</div>{" "}
              </div>
            </div>
            <div className="reading-segment">
              <div className="number" onClick={this.handleAfterMeal}>
                {this.state.readingAdded ? this.state.afterReading : "+"}
              </div>
              <div className="details">
                <div className="meter-heading">After-meal reading</div>
                <div className="meter-heading">
                  {moment().format("LT")}
                </div>{" "}
              </div>
            </div>
          </div>
          <div className="bottom-bar">
            <div>
              <img src="/assets/back.png" width="20px"></img>
            </div>
            <div>
              <img src="/assets/bookmark.png" width="20px"></img>
            </div>
            <div>
              <img src="/assets/notepad.png" width="20px"></img>
            </div>
            <div>
              <img src="/assets/trash-icon.png" width="20px"></img>
            </div>
          </div>
        </div>
      );
    }
  };
}

let mapStateToProps = storeState => ({
  userLogs: storeState.userLogs
});

let Day = connect(mapStateToProps)(UnconnectedDay);

export default Day;
