import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class UnconnectedBeforemeal extends Component {
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
      insulinTaken: "",
      date: undefined,
      submitted: undefined,
      foodId: "",
      uri: "",
      foodQuantity: "",
      foodLabel: "",
      loading: false
    };
  }
  handleSubmit = async evt => {
    evt.preventDefault();

    let formData = new FormData();
    formData.append("date", moment().format("ll"));
    formData.append("time", moment().format("LT"));
    // formData.append("beforeOrAfter", this.state.beforeOrAfter);
    formData.append("reading", this.state.reading);
    // formData.append("mealOrSnack", this.state.mealOrSnack);
    formData.append("foodEntered", JSON.stringify(this.state.foodEntered));
    console.log(this.state.foodEntered);
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
      this.props.history.push("/dashboard");
    }
  };

  handleReading = evt => {
    this.setState({ reading: evt.target.value });
  };

  handleFoodSearch = async () => {
    this.setState({
      foodInput: this.state.foodInput.split(" ").join("%"),
      loading: true
    });
    let res = await fetch(
      "https://api.edamam.com/api/food-database/parser?ingr=" +
        this.state.foodInput +
        "&app_id=41429c04&app_key=78816c918d0fffb0f56d5f8ddbc78a8e",
      {
        "Content-Type": "application/json"
      }
    );
    let resBody = await res.text();

    console.log(resBody);
    let resBodyParsed = JSON.parse(resBody);
    console.log(resBodyParsed.parsed[0].food.foodId);
    console.log(resBodyParsed.parsed[0].measure.uri);
    let resN = await fetch(
      "https://api.edamam.com/api/food-database/nutrients?app_id=41429c04&app_key=78816c918d0fffb0f56d5f8ddbc78a8e",
      {
        headers: new Headers({ "content-type": "application/json" }),
        method: "POST",
        body: JSON.stringify({
          ingredients: [
            {
              quantity: 1,
              measureURI: resBodyParsed.parsed[0].measure.uri,
              foodId: resBodyParsed.parsed[0].food.foodId
            }
          ]
        })
      }
    );
    let resNBody = await resN.text();
    console.log(resNBody);
    let resNBodyParsed = JSON.parse(resNBody);
    let foodLabel = resBodyParsed.parsed[0].food.label;
    let foodQuantity = resBodyParsed.parsed[0].quantity;
    let quantityLabel = resBodyParsed.parsed[0].measure.label;
    console.log(foodLabel);
    console.log(foodQuantity);
    console.log(quantityLabel);
    let carbs = Number(
      resNBodyParsed.totalNutrients.CHOCDF.quantity.toFixed(1)
    );

    let fiber = Number(resNBodyParsed.totalNutrients.FIBTG.quantity.toFixed(1));
    let netCarbs = undefined;
    if (fiber === undefined) {
      netCarbs = carbs;
    } else {
      netCarbs = carbs - fiber;
    }
    // resNBodyParsed.totalNutrients.CHOCDF.unit

    // resNBodyParsed.totalNutrients.CHOCDF.label;
    console.log(carbs);
    let enteredFood = {
      foodLabel,
      foodQuantity,
      quantityLabel,
      netCarbs: Number(netCarbs.toFixed(0))
    };
    let foodEntries = this.state.foodEntered.concat(enteredFood);
    this.setState({ foodEntered: foodEntries, addFood: false, loading: false });
    console.log(this.state.foodEntered);
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
    let totalCarbs = 0;
    if (this.state.loading) {
      return (
        <div className="entry-cont">
          <div className="loading-cont">
            <div className="circle">
              <div class="card">
                <div class="card__face card__face--front"></div>
                <div class="card__face card__face--back"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }
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
    else if (this.state.formStage === 1) {
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
                <h2>Meter Reading</h2>
              </div>
              <div className="log-desc">
                Enter your blood sugar reading from your device
              </div>
              <div className="reading">
                <input type="number" onChange={this.handleReading} />
              </div>
            </div>
            <div className="continue-btn" onClick={this.handleReadingContinue}>
              Click to continue
            </div>
          </div>
        </div>
      );
      // form stage 2 - add food
    } else if (this.state.formStage === 2) {
      // add food popup
      if (this.state.addFood) {
        return (
          <div className="entry-cont">
            <div className="reading-container">
              <div className="input-pos new-pos">
                {/* <div>
                <img src="assets/meter-icon.png" width="100px"></img>
              </div> */}
                {/* <div className="circle">
                  <div class="card">
                    <div class="card__face card__face--front"></div>
                    <div class="card__face card__face--back"></div>
                  </div>
                </div> */}
                <div className="log-heading">
                  <h2>Food item</h2>
                </div>
                <div className="log-desc margin-less">
                  Enter food item and portion size, eg. 1 cup blueberries
                </div>
                <div className="food-reading">
                  <input type="text" onChange={this.handleFood} />
                </div>

                <div
                  className="continue-btn food-add"
                  onClick={this.handleFoodSearch}
                >
                  Click to add
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        // default add food page
        return (
          <div className="entry-cont">
            <div className="reading-container padding-less">
              {this.state.foodEntered.forEach(each => {
                totalCarbs = each.netCarbs * each.foodQuantity + totalCarbs;
              })}
              <div className="gram-heading">{totalCarbs}</div>
              <div className="log-desc-add">Grams of net carbs</div>
              {this.state.foodEntered.map(each => {
                return (
                  <div className="food-items-cont">
                    <div>{each.foodLabel}</div>
                    <div className="food-q">
                      <div>{each.foodQuantity}</div>
                      <div className="q-label">{each.quantityLabel}</div>
                    </div>
                  </div>
                );
              })}
              <div className="input-pos n-pos">
                <div className="log-heading">
                  <h2>Add food</h2>
                </div>
                <div className="log-desc-add">
                  Add all food items that you will be eating
                </div>
                {/* <div className="add-food"> */}
                <div onClick={this.handleFoodClick} className="add-btn">
                  +
                </div>
                {/* </div> */}
              </div>

              <div onClick={this.handleAddContinue} className="continue-btn">
                Click to continue
              </div>
            </div>
          </div>
        );
      }
      // form stage 3 - insulin intake
    } else if (this.state.formStage === 3) {
      return (
        <div className="entry-cont">
          <div className="reading-container">
            {this.state.foodEntered.forEach(each => {
              totalCarbs = each.netCarbs * each.foodQuantity + totalCarbs;
            })}
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
                <h2>Insulin</h2>
              </div>
              <div className="log-desc">
                Enter the amount of insulin units you will take for{" "}
                <span className="grams">{totalCarbs}g</span> of carbohydrates
              </div>
              <div className="reading">
                <input type="number" onChange={this.handleInsulin} />
              </div>
            </div>
            <div className="continue-btn" onClick={this.handleSubmit}>
              Click to continue
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

let Beforemeal = connect()(withRouter(UnconnectedBeforemeal));

export default Beforemeal;
