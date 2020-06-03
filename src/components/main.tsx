import * as React from "react";
import { FunctionComponent, useEffect } from "react";
import { StylesProvider } from "@material-ui/core/styles";
import { BrowserRouter, Route } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";
import { ChatPage } from "./chat";
import { SettingsPage } from "./settings";
import { ThemeProvider } from "@material-ui/core/styles";
import { darkTheme, whiteTheme } from "../theme";

import { SettingsContext, useSettings } from "settingsStore";
import { Index, useChat } from "chatStore";
import i18n from "i18next";
import Styles from "./main.module.less";

/**
 * Component is responsible for displaying main app view.
 * It wrap components in ChatContext as this context is required by:
 * - Header
 * - Footer
 * - Chat
 *
 * @constructor
 */
const MainViewComponent: FunctionComponent = () => {
  const chatContext = useChat();

  return (
    <Grid direction="column" container className={Styles.mainContainer}>
      <Index.Provider value={chatContext}>
        <CssBaseline />
        <Header />
        <Route component={ChatPage} path="/" />
        <Route component={SettingsPage} path="/settings" />
        <Footer />
      </Index.Provider>
    </Grid>
  );
};

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
  const settingsContext = useSettings();

  useEffect(() => {
    if (settingsContext.state.language !== i18n.language) {
      i18n.changeLanguage(settingsContext.state.language);
    }
  }, []);

  return (
    <StylesProvider injectFirst>
      <SettingsContext.Provider value={settingsContext}>
        <SettingsContext.Consumer>
          {({ state }) => {
            return (
              <ThemeProvider theme={state.isDark ? darkTheme : whiteTheme}>
                <BrowserRouter>
                  <Grid
                    justify="center"
                    container
                    className={
                      state.isDark ? Styles.darkTheme : Styles.whiteTheme
                    }
                  >
                    <MainViewComponent />
                  </Grid>
                </BrowserRouter>
              </ThemeProvider>
            );
          }}
        </SettingsContext.Consumer>
      </SettingsContext.Provider>
    </StylesProvider>
  );
};
