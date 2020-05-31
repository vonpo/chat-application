import * as React from "react";
import { useReducer } from "react";

export interface GlobalState {
  isDark: boolean;
}

type Action = {
  type: string;
};

type SetDarkTheme = {
  readonly type: "SetDarkTheme";
};

type SetWhiteTheme = {
  readonly type: "SetWhiteTheme";
};

const reducer = (state: GlobalState, action: Action) => {
  switch (action.type) {
    case "SetDarkTheme":
      return { ...state, isDark: true };
    case "SetWhiteTheme":
      return { ...state, isDark: false };
    default:
      return state;
  }
};

export type Actions = Action | SetDarkTheme;

export const useGlobalState = () => {
  const [state, dispatch] = useReducer<React.Reducer<GlobalState, Actions>>(
    reducer,
    {
      isDark: false,
    }
  );

  return { state, dispatch };
};
