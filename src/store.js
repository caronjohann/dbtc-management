import { createStore } from "redux";

let reducer = (state, action) => {
  if (action.type === "user-logs") {
    return { ...state, userLogs: action.userLogs };
  }
  return state;
};

let store = createStore(
  reducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
