import { createContext, useContext } from "react";

let state = {};
let dispatchCallback = () => {
  console.info("empty callback");
};

let context = createContext({
  state,
  dispatch: () => {
    dispatchCallback();
  },
});

module.exports = {
  useSettingsContext: () => useContext(context),
  SettingsContext: context,
  setupContext: (newState = {}, callback = () => {}) => {
    Object.assign(state, newState);
    dispatchCallback = callback;
  },
  restoreContext: () => {
    dispatchCallback = () => {};
  },
};
