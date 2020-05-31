import { createContext, Dispatch } from "react";
import { GlobalState, Actions } from "./useGlobalState";

export const AppState = createContext<{
  state: GlobalState;
  dispatch: Dispatch<Actions>;
}>({
  state: {
    isDark: false,
  },
  dispatch: () => null,
});
