import * as React from "react";
import { FunctionComponent, useContext } from "react";

import { BrowserRouter, Route } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";
import { PageView } from "./layout/PageView";
import { Chat } from "./chat";
import { Settings } from "./settings";
import { ThemeProvider } from "@material-ui/core/styles";
import { darkTheme, whiteTheme } from "../theme";
import { useGlobalState } from "../store/useGlobalState";
import { AppState } from "../store/AppState";
/**
 * App component consists of main elements of app:
 *
 * Header
 * PageView
 * Footer
 *
 * Has also CssBaseline which removes not needed browser styles.
 *
 * @constructor
 */
export const AppComponent: FunctionComponent = () => {
  return (
    <AppState.Provider value={useGlobalState()}>
      <AppState.Consumer>
        {({ state }) => (
          <ThemeProvider theme={state.isDark ? darkTheme : whiteTheme}>
            <BrowserRouter>
              <Grid direction="column" container className="main-container">
                <CssBaseline />
                <Header />
                <PageView>
                  <Route component={Chat} path="/" exact />
                  <Route component={Settings} path="/settings" />
                </PageView>
                <Footer />
              </Grid>
            </BrowserRouter>
          </ThemeProvider>
        )}
      </AppState.Consumer>
    </AppState.Provider>
  );
};
