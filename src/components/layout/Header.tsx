import * as React from "react";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";

export const Header: FunctionComponent = () => {
  return (
    <AppBar position="relative">
      <nav>
        <Link to="/">
          <Button>Chat</Button>
        </Link>
        <Link to="/settings">Settings</Link>
      </nav>
    </AppBar>
  );
};
