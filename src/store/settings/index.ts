import { createContext, Dispatch, useContext } from "react";
import { Actions } from "./actions";
import * as React from "react";
import { useReducer } from "react";
import defaultLanguage from "../../i18n/defaultLanguage";
import { setItem, getItem } from "../../storage/local";

export interface SettingState {
  isDark: boolean;
  language: string;
  dateFormat: string;
  sendOnCtrlEnter: boolean;
  userName: string;
}
const getDefaultSettings = () => ({
  isDark: false,
  language: defaultLanguage,
  dateFormat: "24HourFormat",
  sendOnCtrlEnter: true,
  userName: "",
});
const localSettingsRaw = getItem("settings");
const localSettings = localSettingsRaw && JSON.parse(localSettingsRaw);
export const initialState = localSettings || getDefaultSettings();

const reducer = (state: SettingState, action: Actions) => {
  switch (action.type) {
    case "SetDarkTheme":
      return { ...state, isDark: true };
    case "SetWhiteTheme":
      return { ...state, isDark: false };
    case "ChangeLanguage":
      return { ...state, language: action.value };
    case "ChangeDateFormat":
      return { ...state, dateFormat: action.value };
    case "ChangeSendType":
      return { ...state, sendOnCtrlEnter: action.value };
    case "SetUser":
      return { ...state, userName: action.value };
    case "ResetSettings":
      return getDefaultSettings();
    default:
      return state;
  }
};

const localStorage = (state: SettingState, action: Actions) => {
  const newState = reducer(state, action);

  if (state !== newState) {
    setItem("settings", JSON.stringify(newState));
  }

  return newState;
};

export const useSettings = () => {
  const [state, dispatch] = useReducer<React.Reducer<SettingState, Actions>>(
    localStorage,
    initialState
  );

  return { state, dispatch };
};

export const SettingsContext = createContext<{
  state: SettingState;
  dispatch: Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const useSettingsContext = () => useContext(SettingsContext);
