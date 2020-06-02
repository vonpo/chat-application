import * as React from "react";
import { FunctionComponent } from "react";
import Styles from "./layout.module.less";
import Paper from "@material-ui/core/Paper";

export const PageView: FunctionComponent = ({ children }) => {
  return <Paper className={Styles.pageView}>{children}</Paper>;
};
