import * as React from "react";
import { FunctionComponent } from "react";
import Styles from "./layout.module.less";
import Paper from "@material-ui/core/Paper";

export const PageView: FunctionComponent<{ hide?: boolean }> = ({
  hide,
  children,
}) => {
  return (
    <Paper className={hide ? Styles.pageViewHide : Styles.pageView}>
      {children}
    </Paper>
  );
};
