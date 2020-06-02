import * as React from "react";
import { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { AddChatMessage } from "../chat/Chat";
import Grid from "@material-ui/core/Grid";
import { Switch, Route } from "react-router-dom";
import { ResetSettings } from "../settings/Settings";

const useStyles = makeStyles({
  appBar: {
    top: "auto",
    bottom: 0,
  },
});
export const Footer: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} component="footer" position="relative">
      <Grid container justify="center">
        <Switch>
          <Route path="/" exact>
            <AddChatMessage />
          </Route>
          <Route path="/settings">
            <ResetSettings />
          </Route>
        </Switch>
      </Grid>
    </AppBar>
  );
};
