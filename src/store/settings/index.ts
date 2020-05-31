import { createContext, Dispatch } from "react";
import { Actions } from "../actions/actions";
import * as React from "react";
import { useReducer } from "react";

export interface SettingState {
  isDark: boolean;
  language: string;
  dateFormat: string;
}

export const initialState = {
  isDark: true,
  language: "pl",
  dateFormat: "24HourFormat",
};

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
    default:
      return state;
  }
};

export const useSettings = () => {
  const [state, dispatch] = useReducer<React.Reducer<SettingState, Actions>>(
    reducer,
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
