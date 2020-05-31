import * as React from "react";
import { FunctionComponent, useContext } from "react";
import { AppState } from "../../store/AppState";

import Button from "@material-ui/core/Button";

export const Settings: FunctionComponent = () => {
  const { state, dispatch } = useContext(AppState);
  const setDark = () => {
    dispatch({ type: "SetDarkTheme" });
  };
  const setWhite = () => {
    dispatch({ type: "SetWhiteTheme" });
  };

  return (
    <div>
      <Button onClick={setDark}>dark</Button>
      <Button onClick={setWhite}>lite</Button>
      settings
    </div>
  );
};
