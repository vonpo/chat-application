import * as React from "react";
import { FunctionComponent } from "react";

export const PageView: FunctionComponent = ({ children }) => {
  return <div className="page-view">{children}</div>;
};
