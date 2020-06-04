import { createContext, Dispatch, useContext } from "react";
import * as React from "react";
import { useReducer } from "react";
import defaultLanguage from "../../i18n/defaultLanguage";
import { setItem, getItem } from "../../storage/local";

type SetSettings = {
  readonly type: "SetSettings";
  readonly value: {};
};

type ResetSettings = {
  readonly type: "ResetSettings";
};

export type Actions = SetSettings | ResetSettings;

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
    case "SetSettings":
      return { ...state, ...action.value };
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
