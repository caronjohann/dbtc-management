import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

class Beforemeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formStage: 1,
      addFood: false,
      foodInput: "",
      beforeOrAfter: "before",
      reading: "",
      mealOrSnack: "snack",
      foodEntered: [],
      insulinTaken: undefined,
      date: undefined,
      submitted: undefined
    };
  }
  handleSubmit = async evt => {
    evt.preventDefault();

    let formData = new FormData();
    formData.append("date", moment().format("ll"));
    formData.append("time", moment().format("LT"));
    formData.append("beforeOrAfter", this.state.beforeOrAfter);
    formData.append("reading", this.state.reading);
    formData.append("mealOrSnack", this.state.mealOrSnack);
    formData.append("foodEntered", this.state.foodEntered);
    formData.append("insulinTaken", this.state.insulinTaken);
    let response = await fetch("/new-log", {
      method: "POST",
      body: formData,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    console.log("response body from /new-log endpoint", body);
    if (!body.success) {
      this.setState({ submitted: false });
    } else {
      this.setState({ submitted: true });
    }
  };

  // handleBefore = () => {
  //   this.setState({ beforeOrAfter: "before" });
  // };
  // handleAfter = () => {
  //   this.setState({ beforeOrAfter: "after" });
  // };
  handleReading = evt => {
    this.setState({ reading: evt.target.value });
  };
  // handleMeal = () => {
  //   this.setState({ mealOrSnack: "meal" });
  // };
  // handleSnack = () => {
  //   this.setState({ mealOrSnack: "snack" });
  // };

  handleFoodSearch = async () => {
    let res = await fetch(
      "https://api.edamam.com/api/food-database/parser?ingr=spinach&app_id=41429c04&app_key=78816c918d0fffb0f56d5f8ddbc78a8e",
      {
        "Content-Type": "application/json"
      }
    );
    let resBody = await res.text();
    console.log(resBody);
    let resN = await fetch(
      "https://api.edamam.com/api/food-database/nutrients?app_id=41429c04&app_key=78816c918d0fffb0f56d5f8ddbc78a8e",
      {
        headers: new Headers({ "content-type": "application/json" }),
        method: "POST",
        body: JSON.stringify({
          ingredients: [
            {
              quantity: 1,
              measureURI:
                "http://www.edamam.com/ontologies/edamam.owl#Measure_unit",
              foodId: "food_bnbh4ycaqj9as0a9z7h9xb2wmgat"
            }
          ]
        })
      }
    );
    let resNBody = await resN.text();
    console.log(resNBody);
  };
  handleFood = evt => {
    // let foodEntered = this.state.foodEntered;
    // let food = evt.target.value;
    // foodEntered.concat(food);
    this.setState({ foodInput: evt.target.value });
  };
  handleFoodClick = () => {
    this.setState({ addFood: true });
  };
  handleEntry = () => {
    let foodEntries = this.state.foodEntered.concat(this.state.foodInput);
    this.setState({ foodEntered: foodEntries, addFood: false });
  };
  handleInsulin = evt => {
    this.setState({ insulinTaken: evt.target.value });
  };
  handleReadingContinue = () => {
    this.setState({ formStage: 2 });
  };
  handleAddContinue = () => {
    this.setState({ formStage: 3 });
  };

  render = () => {
    // let btnBefore = "btn-main";
    // let btnAfter = "btn-main";
    // if (this.state.beforeOrAfter === "before") {
    //   btnBefore = "btn-main btn-clicked";
    // } else {
    //   btnAfter = "btn-main btn-clicked";
    // }
    // let btnMeal = "btn-main";
    // let btnSnack = "btn-main";
    // if (this.state.mealOrSnack === "meal") {
    //   btnMeal = "btn-main btn-clicked";
    // } else {
    //   btnSnack = "btn-main btn-clicked";
    // }

    // form stage 1
    if (this.state.formStage === 1) {
      return (
        <div className="container">
          <div className="reading-container">
            <div className="reading">
              <input type="number" onChange={this.handleReading} />
            </div>
            <div className="log-heading">
              <h2>What's your meter reading?</h2>
            </div>
            <div className="continue-btn" onClick={this.handleReadingContinue}>
              Continue
            </div>
          </div>
        </div>
      );
      // form stage 2 - add food
    } else if (this.state.formStage === 2) {
      // add food popup
      if (this.state.addFood) {
        return (
          <div className="container enter-food">
            <div className="reading-container">
              <div className="reading">
                <input type="text" onChange={this.handleFood} />
              </div>
              <div className="log-heading">
                <h2>Enter food and portion, example: 1 egg</h2>
              </div>
            </div>
            <div onClick={this.handleEntry} className="continue-btn">
              Add
            </div>
          </div>
        );
      } else {
        // default add food page
        return (
          <div className="container">
            <div className="reading-container">
              {this.state.foodEntered.map(each => {
                return <div>{each}</div>;
              })}
              <div className="add-food">
                <div onClick={this.handleFoodClick} className="add-btn">
                  +
                </div>
                <div className="add-txt">Add food</div>
              </div>
            </div>
            <div onClick={this.handleAddContinue} className="continue-btn">
              Continue
            </div>
          </div>
        );
      }
      // form stage 3 - insulin intake
    } else if (this.state.formStage === 3) {
      return (
        <div className="container">
          <div className="reading-container">
            <div className="reading">
              <input type="number" onChange={this.handleReading} />
            </div>
            <div className="log-heading">
              <h2>How much insulin will you take?</h2>
            </div>
            <div className="continue-btn" onClick={this.handleSubmit}>
              Continue
            </div>
          </div>
        </div>
      );
    }
    // return (
    //   <div>
    //     <form onSubmit={this.handleSubmit}>
    //       <h2>Before or after meal reading?</h2>
    //       <a onClick={this.handleBefore} className={btnBefore}>
    //         Before
    //       </a>
    //       <a onClick={this.handleAfter} className={btnAfter}>
    //         After
    //       </a>
    //       <h2>What's your reading?</h2>
    //       <input type="number" onChange={this.handleReading} />
    //       <h2>Are you having a meal or snack?</h2>
    //       <a onClick={this.handleMeal} className={btnMeal}>
    //         Meal
    //       </a>
    //       <a onClick={this.handleSnack} className={btnSnack}>
    //         Snack
    //       </a>
    //       <h2>Specify what you are eating</h2>
    //       {this.state.foodEntered.map(each => {
    //         return <div>{each}</div>;
    //       })}
    //       <input type="text" onChange={this.handleFood} />
    //       <a onClick={this.handleFoodSearch}>Add</a>
    //       <h2>How much insulin are you taking for this meal?</h2>
    //       <input type="number" onChange={this.handleInsulin} />
    //       <input type="submit" value="submit" />
    //     </form>
    //   </div>
    // );
  };
}

export default Beforemeal;
