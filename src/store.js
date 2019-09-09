import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "user-logs") {
    return { ...state, userLogs: action.userLogs };
  }
  if (action.type === "clicked-log") {
    return {
      ...state,
      logDate: action.date,
      logTime: action.time,
      logReading: action.reading,
      logFood: action.food,
      logInsulin: action.insulin
    };
  }
  return state;
};

let store = createStore(
  reducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
